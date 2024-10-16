package main

import (
	"context"
	"fmt"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type Entry struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
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

}

func HandleRequest(ctx context.Context) (Response, error) {
	Entrys, err := getAllRows(ctx, "JournalEntry")
	if err != nil {
		return Response{StatusCode: 404}, err
	}

}

func main() {
	lambda.Start(HandleRequest)
}
