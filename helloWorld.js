
module.exports.helloWorld = async (event) => {
    console.log("Hello World!");
    console.log("Information Passed is== " + event)   
    return {
      statusCode: 201,
    };
  };