import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { GoalRes, Saving, SavingPoint } from 'src/app/models';
import { AdminService } from 'src/app/services/admin.service';
import { ServerService } from 'src/app/services/server.service';
import { StorageService } from 'src/app/services/storage.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
// import Chart from 'chart.js/auto';
// //or

// import { Label } from 'ng2-charts';


@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit{
  
  router = inject(Router)
  storageSvc = inject(StorageService)
  serverSvc = inject(ServerService)
  adminSvc = inject(AdminService)
  fb=inject(FormBuilder)
  activatedRoute=inject(ActivatedRoute)

  userId!:string;
  ugl:GoalRes[]=[]
  homeId!:number;
  public chart: any;
   form!:FormGroup;
   total!:number;
   usl:SavingPoint[]=[]
   remainingYear!:number
   predictedValue!:number
   expectedData:string[]=[]


  ngOnInit(): void {
    this.userId = this.storageSvc.getUser();
    this.form=this.createForm()
    this.adminSvc.getGoal(this.userId)
      .then(result => {
        this.ugl = result;
        console.log(this.ugl);
        const currentYear = new Date().getFullYear()
        this.remainingYear=this.ugl[0].year-currentYear+1
        this.predictedValue=this.ugl[0].predictedValue
        const totalmonth = this.remainingYear * 12;
const expectedamountsavepermonth = this.predictedValue / totalmonth;

// Initialize an array and fill it with the constant value as strings
      this.expectedData = Array.from({ length: totalmonth }, () => expectedamountsavepermonth.toString());
      // Map currentData to strings

      console.log(">>>>",this.expectedData)
      })
      .catch(error => {
        console.error(error); // Handle any errors
      });
    this.adminSvc.getTotalSaving(this.userId)
      .then(result=>{this.total=result.totalSaving})

      

   this.createChartDay();
     this.createMonthChart();
  }

  

  createForm(){
    return this.fb.group({
      userId:this.fb.control<string>(this.userId,Validators.required),
      saving:this.fb.control<number>(0,[Validators.required, this.isNumberValidator()])

    })
  }

  submit(){
    this.form.patchValue({
      userId:this.userId
    });

    this.adminSvc.addSaving(this.form.value as Saving).then(result=>{console.log(result)
      window.location.reload();})

    console.log(this.form.value)
  }

  removeProperty(index:number){
    if (index >= 0 && index < this.ugl.length) {
      // Remove the property at the specified index
      this.homeId=this.ugl[index].id;
      this.adminSvc.deleteGoal(this.homeId).then(result=>{console.log(result.deletedId)
      this.ugl.splice(index, 1);}
      )
      
    }
  }

  // createChart(){

  //   this.adminSvc.getChartSavingPoint(this.userId).then(result=>{
  //   this.usl=result;
  //   console.log(this.usl)
  //   const labels = this.usl.map(item => item.saveDate);
  //   const currentData = this.usl.map(item => item.saving);
  //   console.log(currentData)

  //   const filteredAndStringifiedSavings = currentData
  // .map(value => value.toString()); 
  
  //   this.chart = new Chart("MyChart", {
  //     type: 'bar', //this denotes tha type of chart

  //     data: {// values on X-Axis
  //       labels: labels, 
	//        datasets: [
  //         // {
  //         //   label: "Expected",
  //         //   data: ['467','576', '572', '79', '92',
	// 				// 			 '574', '573', '576'],
  //         //   backgroundColor: 'blue'
  //         // },
  //         {
  //           label: "Current",
  //           data: filteredAndStringifiedSavings,
  //           backgroundColor: 'limegreen'
  //         }  
  //       ]
  //     },
  //     options: {
  //       aspectRatio:2.5
  //     }
  //   })
  //   });
  // }
  createMonthChart() {
    this.adminSvc.getChartSavingPoint(this.userId).then(result => {
      this.usl = result;
      console.log(this.usl);
  
      const labels = [...new Set(this.usl.map(item => item.saveDate.substr(0, 7)))]; // Extract yyyy-mm from saveDate
      const currentData: number[] = [];
  
      // Aggregate data for the same month
      labels.forEach(month => {
        const sum = this.usl
          .filter(item => item.saveDate.substr(0, 7) === month)
          .reduce((total, item) => total + item.saving, 0);
        currentData.push(sum);
      });
  
      // Check if the currentData array is empty
      if (currentData.length === 0) {
        // If it's empty, set expectedData to an array of 0 values
        const totalmonth = this.remainingYear * 12;
        this.expectedData = Array.from({ length: totalmonth }, () => '0');
      } else {
        // Otherwise, calculate the expectedData as before
        const totalmonth = this.remainingYear * 12;
        const expectedamountsavepermonth = this.predictedValue / totalmonth;
        this.expectedData = Array.from({ length: totalmonth }, () => expectedamountsavepermonth.toString());
      }
  
      // Map currentData to strings
      const filteredAndStringifiedSavings = currentData.map(value => value.toString());
      console.log(">>>>", this.expectedData);
      // Create a color array based on positive/negative values
      const backgroundColors = currentData.map(value => (value >= 0 ? 'limegreen' : 'red'));
  
      this.chart = new Chart("MonthChart", {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: "Current",
              data: filteredAndStringifiedSavings,
              backgroundColor: backgroundColors, // Use the color array here
            },
            {
              label: "Expected",
              data: this.expectedData,
              backgroundColor: 'blue'
            }
          ],
        },
        options: {
          aspectRatio: 2.5,
        },
  
      });
  
    });
  }

  // showMonthChart = true; // Default to showing the MonthChart
  // chartDay!: Chart;
  // chartMonth!: Chart;
  // toggleChart() {
  //   this.showMonthChart = !this.showMonthChart;
  //   if (this.showMonthChart) {
  //     this.chartDay.canvas.style.display = 'none';
  //     this.chartMonth.canvas.style.display = 'block';
  //   } else {
  //     this.chartMonth.canvas.style.display = 'none';
  //     this.chartDay.canvas.style.display = 'block';
  //   }
  // }
  
  createChartDay() {
    this.adminSvc.getChartSavingPoint(this.userId).then(result => {
      this.usl = result;
      console.log(this.usl);
      const labels = [...new Set(this.usl.map(item => item.saveDate))]; // Get unique saveDate values
      const currentData: number[] = [];

     
      
      // Aggregate data for the same saveDate
      labels.forEach(date => {
        const sum = this.usl
          .filter(item => item.saveDate === date)
          .reduce((total, item) => total + item.saving, 0);
        currentData.push(sum);
      });
      
      // Map currentData to strings
      const filteredAndStringifiedSavings = currentData.map(value => value.toString());
      
      // Create a color array based on positive/negative values
      const backgroundColors = currentData.map(value => (value >= 0 ? 'limegreen' : 'red'));
      
      this.chart = new Chart("DayChart", {
   
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: "Current",
              data: filteredAndStringifiedSavings,
              backgroundColor: backgroundColors, // Use the color array here
            }
          ],
        },
        options: {
          aspectRatio: 2.5,
        },
      });

    });
  }

  isNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
  
      if (isNaN(value) || typeof value !== 'number') {
        return { isNumber: true };
      }
  
      return null;
    };
  }
}





