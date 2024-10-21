package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type Entry struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Created string `json:"created"`
	Updated string `json:"updated"`
}

type Request struct {
	Entry Entry `json:"entry"`
}

type Response events.APIGatewayProxyResponse

func createJournalEntry(ctx context.Context, entry Entry) (Response, error) {

	fmt.Println(entry)

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

func HandleRequest(ctx context.Context, req Request) (Response, error) {

	return createJournalEntry(ctx, req.Entry)

}

func main() {
	lambda.Start(HandleRequest)
}
