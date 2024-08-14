import { IDisabled } from "./IDisabled";
import { SelectChangeEvent } from "@mui/material";

interface ISelectItems{
    value:string,
    label:string
}

export interface ISelectField extends IDisabled{
    name?:string,
    label?:string,
    value?:string,
    onChange?:(e:SelectChangeEvent)=>void;
    items:ISelectItems[]
}