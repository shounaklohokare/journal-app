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
	ID      string `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Created string `json:"created"`
	Updated string `json:"updated"`
}

type Response events.APIGatewayProxyResponse

func getAllRows(ctx context.Context, tableName string) ([]Entry, error) {

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return nil, fmt.Errorf("failed to load configuration, %v", err)
	}

	svc := dynamodb.NewFromConfig(cfg)

	input := &dynamodb.ScanInput{
		TableName: aws.String(tableName),
	}

	result, err := svc.Scan(ctx, input)
	if err != nil {
		return nil, fmt.Errorf("failed to scan items: %v", err)
	}

	var entries []Entry
	err = attributevalue.UnmarshalListOfMaps(result.Items, &entries)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal Entries: %v", err)
	}

	return entries, nil

}

func HandleRequest(ctx context.Context) (Response, error) {
	entries, err := getAllRows(ctx, "JournalEntry")
	if err != nil {
		return Response{StatusCode: 500}, err
	}

	response, err := json.Marshal(entries)
	if err != nil {
		return Response{StatusCode: 500}, fmt.Errorf("failed to marshal response: %v", err)
	}

	res := Response{
		StatusCode:      200,
		IsBase64Encoded: false,
		Body:            string(response),
		Headers: map[string]string{
			"Content-Type":                 "application/json",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "GET",
			"Access-Control-Allow-Headers": "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Api-Key",
		},
	}

	return res, nil

}

func main() {
	lambda.Start(HandleRequest)
}
