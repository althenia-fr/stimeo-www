import axios from "axios";

export const http = {
  postApi,
  putApi,
  getApi,
  deleteApi
}

function onLocalhost() {
  let hostname = window.location.hostname;
  return (hostname.indexOf("localhost") > -1 || hostname.startsWith('192.'));
}

function workoutDomainNameFromUrl()
{
  let hostname = window.location.hostname;
  // remove any subdomains, e.g. www.example.com -> example.com
    if(hostname)
    {
      let matchInfo = hostname.match(/^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/)
      if(matchInfo && matchInfo[1]) return matchInfo[1];
    }
    else return null;
}

function workoutBaseUrl()
{
  if(onLocalhost()) return "http://localhost:80/";
  else return "https://backend.althenia.fr/";
}

axios.defaults.baseURL = workoutBaseUrl();

function postApi(url: string, data: any, axiosRequestConfig: any) {
  return axios.post(url, data, axiosRequestConfig);
}

function putApi(url: string, data: any, axiosRequestConfig: any) {
  return axios.put(url, data, axiosRequestConfig);
}

function deleteApi(url: string, axiosRequestConfig: any) {

  return axios.delete(url,axiosRequestConfig);

}

function getApi(url : string, axiosRequestConfig : any) {
  return axios.get(url, axiosRequestConfig);
}


export function getFileName(disposition: any)
{
  if (disposition && disposition.indexOf('attachment') !== -1) {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    var matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, '');
    }
  }
  return null;
}

export function prettyPrintErrorMsg(jqXHR: any) {
  //Google Cloud Platform workaround for bug #7985 https://code.google.com/p/googleappengine/issues/detail?id=7985
  let cleansedResponseText = jqXHR.statusText;

  let payload = null;
  if(jqXHR.responseText) payload = jqXHR.responseText
  else if(jqXHR.data) payload = jqXHR.data
  else if(jqXHR.response.data) payload = jqXHR.response.data

  if (payload &&  (typeof payload === 'string' || payload instanceof String) && payload.indexOf('<title>') > -1) {
    //PROD: skip first 4 chars which are the HTTP code on 3 chars followed by space, followed by the error message
    //ex: <html><head><meta http-equiv="content-type" content="text/html;charset=utf-8"><title>401 code invalid or expired</title></head><body text=#000000 bgcolor=#ffffff><h1>Error: code invalid or expired</h1></body></html>

    cleansedResponseText = payload.split("<title>")[1].split("</title>")[0];

    //DEV: skip first 10 chars as we received <title>Error 401 code invalid or expired</title>
    let skipChars = cleansedResponseText.indexOf('Error') == 0 ? 10 : 4;

    cleansedResponseText = cleansedResponseText.substring(skipChars);

    //html text might have " protected as &quot; if we tried to pass json through
    cleansedResponseText = cleansedResponseText.replace(/(&quot;)/g, "\"");

  }

  return cleansedResponseText;
}
