export interface Person {
    name: string;
    position: string;
    category: string;
    institution: string;
    year: string
  }
  
  export interface Institution {
    name: string;
    person: Person[];
  }
  
  export interface Category {
    name: string;
    institution: Institution[];
  }
  
  export interface StructuredPEPData {
    name: string;
    history: {
      year: string;
      position: string;
      category: string;
      institution: string;
    }[];
  }