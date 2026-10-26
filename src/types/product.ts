export interface Product { id:number; title:string; description:string; category:string; subcategory?:string; subcategoryName?:string; price:number; discountPercentage:number; rating:number; stock:number; brand?:string; thumbnail:string; images:string[]; reviews?:{rating:number;comment:string;date:string;reviewerName:string}[] }
export interface ProductResponse { products:Product[]; total:number; skip:number; limit:number }
export interface Category { slug:string; name:string; url:string; count?:number }
export interface CartItem { product:Product; quantity:number }
