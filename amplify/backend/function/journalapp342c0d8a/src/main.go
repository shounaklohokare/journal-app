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
	EntryID string `dynamodbav:"entry_id" json:"entry_id"`
	UserID  string `dynamodbav:"user_id" json:"user_id"`
	Title   string `dynamodbav:"title" json:"title"`
	Content string `dynamodbav:"content" json:"content"`
	Created string `dynamodbav:"created" json:"created"`
	Updated string `dynamodbav:"updated" json:"updated"`
}

type Response events.APIGatewayProxyResponse

func getAllRows(ctx context.Context, userId string) ([]Entry, error) {

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return nil, fmt.Errorf("failed to load configuration, %v", err)
	}

	svc := dynamodb.NewFromConfig(cfg)

	partitionKeyName := "user_id"
	queryPaginator := dynamodb.NewQueryPaginator(svc, &dynamodb.QueryInput{
		TableName:              aws.String("JournalEntries"),
		KeyConditionExpression: aws.String(fmt.Sprintf("%s = :v", partitionKeyName)),
		ExpressionAttributeValues: map[string]types.AttributeValue{
			":v": &types.AttributeValueMemberS{Value: userId},
		},
	})

	var entries []Entry
	var response *dynamodb.QueryOutput
	for queryPaginator.HasMorePages() {

		response, err = queryPaginator.NextPage(ctx)
		if err != nil {
			return nil, fmt.Errorf("couldn't fetch data for the query. Here's why: %v", err)
		}

		var entriesPage []Entry
		err = attributevalue.UnmarshalListOfMaps(response.Items, &entries)
		if err != nil {
			return nil, fmt.Errorf("error occured while parsing response body. Here's why: %v", err)
		}

		entries = append(entries, entriesPage...)

	}

	return entries, nil

}

func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {

	fmt.Println("In /get-entries λ")

	userId := request.PathParameters["user-id"]

	entries, err := getAllRows(ctx, userId)
	if err != nil {
		return Response{StatusCode: 500}, err
	}

	fmt.Printf("Entries returned :- %v", entries)

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
