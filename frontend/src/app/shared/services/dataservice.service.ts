import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Messages } from '../models/messages.data';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  REST_API_URL: string = "http://localhost:8080/"

  constructor(private httpClient: HttpClient) { }

  public getMessagesFromUser(idUser: number): Promise<Messages> {
    return this.httpClient.get<Messages>(
      this.REST_API_URL + idUser
    ).toPromise();
  }
  
  public getAllMessages(): Promise<Messages> {
    return this.httpClient.get<Messages>(
      this.REST_API_URL
    ).toPromise();
  }

  public async createChat(idUser: number) {
    let data = await this.httpClient
      .post<{
        message: string;
      }>(this.REST_API_URL, {})
      .toPromise();
    return data;
  }

  async sendMessage(idUser: number, message: Messages) {
    const data = await this.httpClient
      .put<Messages>(this.REST_API_URL + idUser, message)
      .toPromise();
    console.log(data);
    return data;
  }
}
