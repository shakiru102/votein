
// Actual Types
export interface adminDetails {
    email: string;
    password: string;
    admin: boolean;
    electionDate: string;
}

export interface userDetails  {
    firstname?: string;
    lastname?: string;
    voterID?: string;
    phonenumber?: string;
    email: string;
    password: string;
    biometrics?: any,
    electionDate?: string;
    _id?: any

}

export interface candidateDetails {
    firstname: string;
    lastname: string;
    position: string;
    party: string;
    electionDate: string;
    NIN: string;
    _id?: any

}

export interface usersVote {
    userID: string;
    votes: editPosition[]
    electionDate?: string;
}

export interface editPosition {
    position: string;
    maxVote: number;
    _id?: string;
    vote?: string | string[]
}

export interface registerBioRes{
    biometrics?: any;
    register: boolean;
    error?: string;
}
export interface dashboardDetails { 
    title: string 
    color: string
    btncolor: string
    no: number 
    to: string 
    img: string
}