import { useState ,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
const [length,setlength] = useState(8);

const [numberAllowed ,setNumberAllowed] = useState(false);

const [CharecterAllowed ,setCharecterAllowed] = useState(false);

const[password ,setPassword] = useState("");

const passwordGenerator = useCallback(() => {
 let pass = ""

 let str = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz"
 if(numberAllowed) str += "0123456789"

 if(CharecterAllowed) str += "!@#$%^&*"

  for(let i =1;i<= length; i++){
    let char = Math.floor(Math.random() *str.length +1) 
    pass += str.charAt(char)//aap ya + nahi karoge to value over rigth hogi
    setPassword(pass);

  }
},//deoendence array hai
//yaha vo value ati hai jisme koi change hone per optimais karo
[
  length,numberAllowed,CharecterAllowed,setPassword
])
//yaha change hone per dubara function run ho
useEffect(() => {passwordGenerator()},[length,numberAllowed,CharecterAllowed,passwordGenerator])

const passwordReff = useRef(null)//isko use better uerser interfrence dene ke liye karte hai
const copyPasswordToclipboard = useCallback(() => {
  passwordReff.current?.select(password)
  passwordReff.current?.setSelectionRange(0,20)
  window.navigator.clipboard.writeText(password)
},[password])
  return (
    <>
      <div className='w-full max-w-md px-4 py-3 mx-auto my-8 text-orange-500 bg-gray-800 rounded-lg shadow-md'>
          <h1 className='text-center text-white'>Password Generator
          </h1>
          <div className='flex mb-4 overflow-hidden rounded-lg shadow'>
          
            <input type="text"
            value={password}
            className='w-full px-1 px-3 outline-none'
            placeholder='password'
            readOnly
            ref={passwordReff}
             />
            
            <button
            onClick={copyPasswordToclipboard}
             className='px-3 py-3 text-white bg-blue-800 outline-none shrink-0'>copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
            
              <input 
              type="range" 
              min={6} 
              max={100}
             value={length} 
             className='cursor-pointer'
             onChange={(e) => {setlength(e.target.value)}}/>
             <label >Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
            
              <input
               type="checkbox"
               defaultChecked={numberAllowed}
               id='numberInput'
               onChange={()=>{setNumberAllowed((prevous) => !prevous)}}
               />
               <label htmlFor='numberInput' >NumberAllowed</label>
            </div>
            <div className='flex items-center gap-x-1'>
            
              <input
               type="checkbox" 
               defaultChecked={CharecterAllowed}
               id='charcterInput'
               onChange={()=>{setCharecterAllowed((prevous) => !prevous)}}
              />
              <label htmlFor="charcterInput">Charcter</label>
              
            </div>
          </div>
      </div>
    </>
  )
}

export default App
