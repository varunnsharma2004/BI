import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  user: any[] = [{
    userName: 'admin@gmail.com',
    password: 'admin@2024'
  }]

  GroupsDetail: any[] = [];
  adExpens: any[] = [];
  constructor() {



  }

  addGroup(GrpName: any, status: any,) {

  }
  addMembers(grpName: any, members: any, index: any) {

    if (!this.GroupsDetail[index].Members && !this.GroupsDetail[index].status) {
      this.GroupsDetail[index].Members = [];
      this.GroupsDetail[index].status = 0;
    }
    const isValid = !this.GroupsDetail[index].Members.some((i: any) => i.name === members);
    if (isValid) {
      this.GroupsDetail[index].status = 1;
      this.GroupsDetail[index].Members.push({
        G_Name: grpName,
        name: members,
        payDone: 0
      })

      console.log(this.GroupsDetail);
      debugger
      return true;

    }
    return false
  }
  removeMember(grpIndx: any, indx: any) {

    if (this.GroupsDetail[grpIndx] && this.GroupsDetail[grpIndx].Members[indx]) {
      this.GroupsDetail[grpIndx].Members.splice(indx, 1);
      // if (!this.GroupsDetail[grpIndx].Members[indx]) {
      //   this.GroupsDetail[grpIndx].status = 0;
      // }
    }
  }

  addnewGroup(grpName: any) {
    const isValid = !this.GroupsDetail.some((i: any) => i.GrpName == grpName);
    debugger
    if (isValid) {
      this.GroupsDetail.push({ GrpName: grpName });
      return true;
    }
    return false;
  }

  Groups() {
    return this.GroupsDetail;
  }

  addNewExpenses(title: any, expns: any, payBy: any, grpName: any, index: any) {
    this.adExpens.push({
      title: title,
      exp: expns,
      paymentBy: payBy,
      group: grpName,
      date: new Date()
    });

    this.GroupsDetail[index].totalAmount = this.adExpens.filter(i => i.group == this.GroupsDetail[index].GrpName).reduce((total, exp) => total + exp.exp, 0);

    debugger

    return this.adExpens;
  }

 
  PaymentByMember(indx: any, Mname: any, amount: any) {
    debugger
    const memberIndex = this.GroupsDetail[indx].Members.findIndex((member: any) => member.name === Mname);
    const members = this.GroupsDetail[indx].Members.length;

    const shareAmount=amount/members;

    if (memberIndex !== -1) { 
      this.GroupsDetail[indx].Members[memberIndex].payDone += shareAmount;
      this.GroupsDetail[indx].Members.forEach((member: any, index: any) => {
        if (index !== memberIndex) {
          // member.share += shareAmount;  
          member.payDone -=shareAmount
        }
      });
      console.log(this.GroupsDetail)
      debugger
    }
  }
}