import azure.functions as func
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)


@app.route(route="setting/current")
def GetCurrentSetting(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(json.dumps({"name": "Current"}), status_code=200)
