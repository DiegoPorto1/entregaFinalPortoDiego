import './ItemListContainer.css'
import {useState,useEffect} from "react"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom";
import { getDocs, collection , query, where } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
const ItemListContainer = ({greeting}) =>  {
    const [products, setProducts] = useState([])
    const [loanding, setLoanding] = useState(true)
    
    const {categoryId} = useParams ()

    useEffect(()=>{
        setLoanding (true)
        const collectionRef = categoryId
             ? query(collection(db,'products'), where('category','==', categoryId))
             : collection (db, 'products')

        getDocs(collectionRef)
         .then (response => {
            const productsAdapted = response.docs.map (doc=> {
                const data = doc.data()
                return {id: doc.id, ...data}
            })
            console.log (productsAdapted);
            setProducts(productsAdapted)
         })
         .catch (error =>{
            console.log(error)
         })
         .finally (() => {
            setLoanding(false)
         })

    }, [categoryId])

    return (
        <div className="listContainer">
            <h1>{greeting}</h1>
            <ItemList products={products}/>
        </div>
    )
}

export default ItemListContainer