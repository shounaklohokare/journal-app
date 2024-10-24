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
)

type Entry struct {
	ID      string `dynamodbav:"id"`
	Title   string `dynamodbav:"title"`
	Content string `dynamodbav:"content"`
	Created string `dynamodbav:"created"`
	Updated string `dynamodbav:"updated"`
}

type Response events.APIGatewayProxyResponse

func createJournalEntry(ctx context.Context, entry Entry) (Response, error) {

	fmt.Printf("Entry Object :- %v\n", entry)
	fmt.Printf("Entry Object :- %v\n", entry.ID)

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to load configuration, %v", err)
	}

	svc := dynamodb.NewFromConfig(cfg)

	av, err := attributevalue.MarshalMap(entry)
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to load attributevalue, %v", err)
	}

	input := &dynamodb.PutItemInput{
		TableName: aws.String("JournalEntry"),
		Item:      av,
	}

	fmt.Printf("Input Object :- %v\n", input)

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

func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {

	fmt.Println("Inside /create-update-entry λ")
	fmt.Printf("Request Body :- %s\n", request.Body)

	entry, err := createEntryObject(request.Body)
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to put item, %v", err)
	}

	return createJournalEntry(ctx, entry)

}

func createEntryObject(body string) (Entry, error) {

	var entry Entry

	err := json.Unmarshal([]byte(body), &entry)
	if err != nil {
		return entry, fmt.Errorf("error Occured while parsing request body :- %s", err)
	}

	fmt.Printf("Entry Object :- %v\n", entry)

	return entry, nil

}

func main() {
	lambda.Start(HandleRequest)
}
