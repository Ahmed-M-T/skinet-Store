using System;

namespace API.Errors
{

public class ApiResponse
{
        public ApiResponse(int statusCode, string message=null)
        {
            StatusCode = statusCode;
            Message = message??GetDefaultMessageForStatusCode(StatusCode);
        }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch{
                400 => "A bad request, you have made",
                401 =>"Authrized, you are not",
                404 =>"Resource found, it was not",
                505 => "Errors are the path to the dark side. Erros lead to anger. Anger leads to hate. Hate lead to career change.",
                _ => null

            };
        }

        public int StatusCode { get; set; }
    public string Message { get; set; }
}

}