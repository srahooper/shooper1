'use strict';
const AWS = require('aws-sdk');

let debug = 1;

module.exports.updateCustomer = async (event) => {
   var info = {};
 
   try {
      if (event.isBase64Encoded == true){
        const decodedBuffer = Buffer.from(event.body, 'base64');
        const jsonString = decodedBuffer.toString();
        const parsedObject = JSON.parse(jsonString);
        info= parsedObject;
        if (debug == 1){}
          console.log("const decodedBuffer = Buffer.from(event.body, 'base64');= "+ decodedBuffer);
          console.log("const jsonString = decodedBuffer.toString();= " + jsonString);
          console.log("const parsedObject = JSON.parse(jsonString);= " + parsedObject);
          console.log("isBase64Encoded was true and the parsedObject is= " + parsedObject);
       }     
   } catch (error){console.log("error out check if event.isBase64Encoded == true");}

   if (debug ==1){
     try {
       console.log("Print out most of the event information.");
       console.log("resource is= " + event.resource);
       console.log("path is= " + event.path);
       console.log("httpMethod= " + event.httpMethod);  
       console.log("requestContext is= " + event.requestContext); 
       console.log("headers are= " + event.headers); 
       console.log("multiValueHeaders are= " + event.multiValueHeaders);
       console.log("queryStringParameters are= " + event.queryStringParameters);   
       console.log("multiValueQueryStringParameters are= " + event.multiValueQueryStringParameters); 
       console.log("pathParameters are= " + event.pathParameters);
       console.log("stageVariables are= " + event.stageVariables);
       console.log("body is = " + event.body);
       console.log("isBase64Encoded= " + event.isBase64Encoded);
      } catch(error){console.log("Error was caught trying to prnt event information.");}
    }
   

   if (event.body) {
        //The next try command is the one that works with the post man setup using raw with the json string and the key Content-Type and key application/json 
        if (debug == 1){console.log("we are PENN STATE LOL in the if(event.body) piece of code");}
        try {info = JSON.parse(event.body);} catch(error){console.log("ERROR with first try event where setting info = JSON.parse(event.body)"); info = event; console.log ("info.body is " + info.body); console.log ("info is " + info);}
        if (info.body) {
            if (debug == 1){(console.log("info body is= " + info.body)); console.log("info.name= " + info.name);}
        } 
  } else if (event.body == undefined){
    if (debug == 1){
      info = event;
      console.log("IN THE ELSE IF (event.body == undefined) PART OF THE CODE");
      console.log("event is:==== " + event);
      console.log("event.body is:==== " + event.body);
      console.log("info is:==== " + info);
      console.log("info is of type= " + typeof(info));
      console.log("info.name is:==== " + info.name);
      console.log("info.email is:==== " + info.email);  
    }
   } else if (typeof(event.body == string)){
      if (debug == 1){
        console.log("in the else if (typeof(event.body == string)) part of the code");
        console.log("event.boyd is:==== " + event.body);
        console.log("info.name is:==== " + info.name);
        console.log("info.email is:==== " + info.email);  
      }
      try {
        info = JSON.parse(event.body);
        if (debug == 1) {
            console.log("try {info = JSON.parse(event.body); is successful");
        }
      } catch (error) {
        if (debug == 1){
          console.log("ERROR Caught info = JSON.parse(event.body) has FAILED");
          console.log("event.bofy is:==== " + event.body);
          console.log("info.name is:==== " + info.name);
          console.log("info.email is:==== " + info.email);  
        }
      } 
     } 
   else {
     info = JSON.parse('{"name": "SRAHInCode","email": "srahooper@gmail.com"}');
     if (debug == 1){
      console.log("event.body set manually in else clause i.e. successfull");
      console.log("info.name is:==== " + info.name);
      console.log("info.email is:==== " + info.email);  
    }
  }

  if (debug == 1){
    console.log("Just BEFORE ACCESSING DYNAMO TABLE");
    console.log("info.name is:==== " + info.name); 
   }
   
  
  //const dynamodb = new AWS.DynamoDB.DocumentClient(); 
  const dynamodb = new AWS.DynamoDB(); 
  
  const params = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Key: {'primary_key': {S: info.name}},
    UpdateExpression: "set email = :e",
    ExpressionAttributeValues: {":e": {"S":info.email}}
  };
  
  if (debug == 1){console.log("params is " + params.TableName + " " + params.Key);}
  
  try {
    const data = await dynamodb.updateItem(params).promise();
    return { body: JSON.stringify(data)}
  } catch (err) {console.log("error is " + err); return {error:err}}

 }