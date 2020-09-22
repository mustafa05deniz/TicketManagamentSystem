import { Injectable } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  userInformation: any;
  constructor(public crud_service: CrudService) {
    this.userInformation = JSON.parse(localStorage.getItem("user"))
  }

  async addNewPost(data) {
    return new Promise(async (resolve, reject) => {
      this.crud_service.post_with_json('/posts/addNewPost', data).toPromise().then(result => {
        resolve(result)
      }).catch(err => {
        reject(err);
      })
    })

  }

  async TicketList(role) {
    return new Promise(async (resolve, reject) => {
      if(role==0){
        this.crud_service.get('/ticket/list').toPromise().then(result => {
          if(result['status']==200){
            resolve(result['data'].reverse());
          }
          else{
            alert("error")
          }
        }).catch(err => {
          reject(err);
        })
      }else{
        this.crud_service.get('/ticket?filter[_id]='+this.userInformation._id).toPromise().then(result => {
          if(result['status']==200){
            resolve(result['data'].reverse());
          }
          else{
            alert("error")
          }
        }).catch(err => {
          reject(err);
        })
      }
      
    })

  }

  async geTwithId(id) {
    return new Promise(async (resolve, reject) => {
      this.crud_service.get('/ticket/search?filter[_id]='+id).toPromise().then(result => {
        if(result['status']==200){
          resolve(result['data']);
        }
        else{
          alert("error")
        }
      }).catch(err => {
        reject(err);
      })
    })

  }

  async addNewMessage(data) {
    return new Promise(async (resolve, reject) => {
      this.crud_service.post('/ticket/addMessageToTicket',data).toPromise().then(result => {
        if(result['status']==200){
          resolve(true);
        }
        else{
          resolve(false);
        }
      }).catch(err => {
        reject(err);
      })
    })
  }

  async changeTicketStatus(data) {
    return new Promise(async (resolve, reject) => {
      this.crud_service.post_with_json('/ticket/changeStatus',data).toPromise().then(result => {
        if(result['status']==200){
          resolve(result['data']);
        }
        else{
          alert("error")
        }
      }).catch(err => {
        reject(err);
      })
    })
  }

  async filter(data) {
    return new Promise(async (resolve, reject) => {
      this.crud_service.get('/ticket/search?filter[email]='+data.email+'&filter[title]='+data.title).toPromise().then(result => {
        if(result['status']==200){
          resolve(result['data']);
        }
        else{
          alert("error")
        }
      }).catch(err => {
        reject(err);
      })
    })

  }

  async filterWithStatus(status) {
    return new Promise(async (resolve, reject) => {
      this.crud_service.get('/ticket/search?filter[status]='+status).toPromise().then(result => {
        if(result['status']==200){
          resolve(result['data']);
        }
        else{
          alert("error")
        }
      }).catch(err => {
        reject(err);
      })
    })

  }

  async addNewTicket(data) {
    return new Promise(async (resolve, reject) => {
      this.crud_service.post('/ticket/add',data).toPromise().then(result => {
        if(result['status']==200){
          resolve(true);
        }
        else{
          resolve(false);
        }
      }).catch(err => {
        reject(err);
      })
    })

  }

  
}