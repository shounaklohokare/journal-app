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
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type Entry struct {
	ID string `dynamodbav:"id"`
}

type Response events.APIGatewayProxyResponse

func handleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {

	fmt.Println("Inside /delete-entry λ")
	fmt.Printf("Request Body :- %s\n", request.Body)

	entry, err := generateEntryObject(request.Body)
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to put item, %v", err)
	}

	return deleteRow(ctx, "JournalEntry", entry)

}

func deleteRow(ctx context.Context, tableName string, entry Entry) (Response, error) {

	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to load configuration, %v", err)
	}

	svc := dynamodb.NewFromConfig(cfg)

	key, err := entry.GetKey()
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to generate key, %v", err)
	}

	input := &dynamodb.DeleteItemInput{
		TableName: aws.String(tableName),
		Key:       key,
	}

	_, err = svc.DeleteItem(ctx, input)
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to delete item, %v", err)
	}

	return Response{
		StatusCode:      200,
		IsBase64Encoded: false,
		Body:            string("Item deleted successfully"),
		Headers: map[string]string{
			"Content-Type":                 "application/json",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "GET, PUT, POST",
			"Access-Control-Allow-Headers": "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Api-Key",
		},
	}, nil
}

func generateEntryObject(body string) (Entry, error) {

	var entry Entry

	err := json.Unmarshal([]byte(body), &entry)
	if err != nil {
		return entry, fmt.Errorf("error occured while parsing request body :- %s", err)
	}

	fmt.Printf("Entry Object :- %v\n", entry)

	return entry, nil

}

func (entry Entry) GetKey() (map[string]types.AttributeValue, error) {
	id, err := attributevalue.Marshal(entry.ID)
	if err != nil {
		return nil, err
	}

	return map[string]types.AttributeValue{"id": id}, nil
}

func main() {
	lambda.Start(handleRequest)
}
