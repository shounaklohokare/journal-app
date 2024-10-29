package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/google/uuid"
)

type Entry struct {
	ID      string `dynamodbav:"id"`
	Title   string `dynamodbav:"title"`
	Content string `dynamodbav:"content"`
	Created string `dynamodbav:"created"`
	Updated string `dynamodbav:"updated"`
}

type Response events.APIGatewayProxyResponse

func main() {
	lambda.Start(HandleRequest)
}

func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {

	fmt.Println("Inside /create-update-entry λ")
	fmt.Printf("Request Body :- %s\n", request.Body)

	entry, err := generateEntryObject(request.Body)
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to parse request body into entry object, %v", err)
	}

	if entry.ID == "-1" {
		return createJournalEntry(ctx, entry)
	}

	return updateJournalEntry(ctx, entry)

}

func generateEntryObject(body string) (Entry, error) {

	var entry Entry

	err := json.Unmarshal([]byte(body), &entry)
	if err != nil {
		return entry, err
	}

	fmt.Printf("Entry Object :- %v\n", entry)

	return entry, nil

}

func createJournalEntry(ctx context.Context, entry Entry) (Response, error) {

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to load configuration, %v", err)
	}

	svc := dynamodb.NewFromConfig(cfg)

	entry.ID = getUuid()

	av, err := attributevalue.MarshalMap(entry)
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to load attributevalue, %v", err)
	}

	input := &dynamodb.PutItemInput{
		TableName: aws.String("JournalEntry"),
		Item:      av,
	}

	_, err = svc.PutItem(ctx, input)
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to put item, %v", err)
	}

	return Response{
		StatusCode:      200,
		IsBase64Encoded: false,
		Body:            string("Item created successfully"),
		Headers: map[string]string{
			"Content-Type":                 "application/json",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "GET, PUT, POST",
			"Access-Control-Allow-Headers": "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Api-Key",
		},
	}, nil

}

func getUuid() string {

	newUUID := uuid.New()

	return newUUID.String()

}

func updateJournalEntry(ctx context.Context, entry Entry) (Response, error) {

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to load configuration, %v", err)
	}

	svc := dynamodb.NewFromConfig(cfg)

	key, err := attributevalue.MarshalMap(map[string]string{
		"id": entry.ID,
	})
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to marshal key: %v", err)
	}

	updateExpression := "SET #title = :title, #content = :content, #created = :created, #updated = :updated"
	expressionAttributeNames := map[string]string{
		"#title":   "title",
		"#content": "content",
		"#created": "created",
		"#updated": "updated",
	}
	expressionAttributeValues, err := attributevalue.MarshalMap(map[string]interface{}{
		":title":   entry.Title,
		":content": entry.Content,
		":created": entry.Created,
		":updated": entry.Updated,
	})
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to marshal update values: %v", err)
	}

	input := &dynamodb.UpdateItemInput{
		TableName:                 aws.String("JournalEntry"),
		Key:                       key,
		UpdateExpression:          aws.String(updateExpression),
		ExpressionAttributeNames:  expressionAttributeNames,
		ExpressionAttributeValues: expressionAttributeValues,
	}

	_, err = svc.UpdateItem(ctx, input)
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to update item: %v", err)
	}

	return Response{
		StatusCode:      200,
		IsBase64Encoded: false,
		Body:            string("Item updated successfully"),
		Headers: map[string]string{
			"Content-Type":                 "application/json",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "GET, PUT, POST",
			"Access-Control-Allow-Headers": "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Api-Key",
		},
	}, nil

}
