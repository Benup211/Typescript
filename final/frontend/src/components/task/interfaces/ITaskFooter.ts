import React from 'react';

export interface ITaskFooter{
    id:string,
    status:string,
    onStatusChange?:(e:React.ChangeEvent<HTMLInputElement>|React.SyntheticEvent<Element, Event>,id:string)=>void;
    onClick?:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>|React.MouseEvent<HTMLAnchorElement>,id:string)=>void;
}