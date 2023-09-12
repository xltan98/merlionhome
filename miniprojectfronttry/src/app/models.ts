export interface predPayload {
    
    year:number;
    townCode:number;
    flatTypeCode:number;
    storeyRangeCode:number;
    floorAreaSqm:number;
    flatModelCode:number;
    remainingLeaseYear:number;
}


export interface goal{
    userId:string;
    year:number;
    townCode:string;
    flatTypeCode:string;
    storeyRangeCode:string;
    floorAreaSqm:number;
    flatModelCode:string;
    remainingLeaseYear:number;
    predictedValue:number

}

const townMapping: { [key: string]: string } = {
    "0": "Ang Mo Kio",
    "1": "Bedok",
    "2": "Bishan",
    "3": "Bukit Batok",
    "4": "Bukit Merah",
    "5": "Bukit Panjang",
    "6": "Bukit Timah",
    "7": "Central Area",
    "8": "Choa Chu Kang",
    "9": "Clementi",
    "10": "Geylang",
    "12": "Jurong East",
    "13": "Jurong West",
    "14": "Kallang",
    "15": "Marine Parade",
    "16": "Pasir Ris",
    "17": "Punggol",
    "18": "Queenstown",
    "19": "Sembawang",
    "20": "Sengkang",
    "21": "Serangoon",
    "22": "Tampines",
    "23": "Toa Payoh",
    "24": "Woodlands",
    "25": "Yishun",
  };
  const flatTypeMapping: { [key: string]: string } = {
    "2": "2 Room",
    "3": "3 Room",
    "4": "4 Room",
    "5": "5 Room",
    "6": "Executive",
  };

  const storeyRangeMapping: { [key: string]: string } = {
    "0": "1 to 3",
    "1": "4 to 6",
    "2": "7 to 9",
    "3": "10 to 12",
    "4": "13 to 15",
    "5": "16 to 18",
    "6": "19 to 21",
    "7": "22 to 24",
    "8": "25 to 27",
    "9": "28 to 30",
    "10": "31 to 33",
    "11": "34 to 36",
    "12": "37 to 39",
    "13": "40 to 42",
    "14": "43 to 45",
    "15": "46 to 48",
    "16": "49 to 51",
  };

  const flatModelMapping: { [key: string]: string } = {
    "0": "Improved",
    "1": "New Generation",
    "2": "DBSS",
    "3": "Standard",
    "4": "Apartment",
    "5": "Simplified",
    "6": "Model A",
    "7": "Premium Apartment",
    "8": "Adjoined flat",
    "9": "Model A-Maisonette",
    "10": "Maisonette",
    "11": "Type S1",
    "12": "Type S2",
    "13": "Model A2",
    "14": "Terrace",
  };

//   export function convertSelections(goal:goal):goal{
//     return{...goal,
//     userId:goal.userId,
//     year:goal.year,
//     floorAreaSqm:goal.floorAreaSqm,
//     remainingLeaseYear:goal.remainingLeaseYear,
//     predictedValue:goal.predictedValue,
//     town:townMapping[goal.town]||"0",
//     flatType:flatTypeMapping[goal.flatType]||"0",
//     storeyRange:storeyRangeMapping[goal.storeyRange]||"0",
//     flatModel:flatModelMapping[goal.flatModel]||"0"}
//   }
export function convertSelections(goal: goal): goal {
    return {
      ...goal,
      townCode: townMapping[goal.townCode] || '0',
      flatTypeCode: flatTypeMapping[goal.flatTypeCode] || '0',
      storeyRangeCode: storeyRangeMapping[goal.storeyRangeCode] || '0',
      flatModelCode: flatModelMapping[goal.flatModelCode] || '0',
    };
  }
  

  
export interface Users {
    id: string,
    name: string,
    email: string,
    phone: string,
    password: string
    role:string
}

export interface LoginDetails {
    id: string,
    password: string
}

export interface GoalRes{
    id:number;
    userId:string;
    year:number;
    town:string;
    flatType:string;
    storeyRange:string;
    floorAreaSqm:number;
    flatModel:string;
    remainingLeaseYear:number;
    predictedValue:number

}

export interface Saving{
    userId:string;
    saving:number;
}

export interface SavingPoint{
    userId:string;
    saveDate:string;
    saving:number;
}

export interface resaleDetails{
  uploader:string;
  price:number;
  address:string;
  postalCode:number;
  floorAreaSqm:number;
  flatType:string;
  storey:number;
  remainingLeaseYear:number;
}

export interface resaleDetailsResp{
  uploadId:string;
  uploader:string;
  price:number;
  address:string;
  postalCode:number;
  floorAreaSqm:number;
  flatType:string;
  storey:number;
  remainingLeaseYear:number;
  images:string[];
  description:string;
}

export interface ListingAppointment{

  agentId:string;
  customerId:string;
  date:string;
  time:string;
  address:string;
  status:string;
  uploadId:string;

}

export interface ListingAppointmentRes{
  appointmentId:number;
  agentId:string;
  customerId:string;
  date:string;
  time:string;
  address:string;
  status:string;
  uploadId:string;
  

}

      // uploader:this.storageSvc.getUser(),
      // price: this.fb.control<number>(0,[Validators.required]),
      // address: this.fb.control<string>('',[Validators.required]),
      // postalCode:this.fb.control<number>(0,Validators.required),
      // floorAreaSqm:this.fb.control<number>(0,Validators.required),
      // flatType: this.fb.control<string>('',Validators.required),
      // storey:this.fb.control<number>(0,(Validators.required)),
      // remainingLeaseYear:this.fb.control<number>(1,[Validators.required])

