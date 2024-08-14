import React from 'react';

export interface ITaskFooter{
    onStatusChange?:(e:React.SyntheticEvent<Element, Event>)=>void;
    onClick?:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void;
}