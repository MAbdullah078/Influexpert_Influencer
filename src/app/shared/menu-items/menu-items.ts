import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '/',
    name: 'My Profile',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: 'widgets',
    name: 'Contact Info',
    type: 'link',
    icon: 'software-scale-reduce'
  },
  {
    state: 'social',
    name: 'Settings',
    type: 'link',
    icon: 'basic-elaboration-message-happy'
  },

];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
