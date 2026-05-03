import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'
import './index.css'
function App() {
  let [password,Setpassword]=useState('')
  let [leng,setLength]=useState(8)
  let [isNumber,setNumber]=useState(false)
  let [isChar,setChar]=useState(false)

let generatePassword=useCallback(()=>{
  let pass=""
  let str=""
  str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(isNumber){
    str+="1234567890"
  }
  if(isChar){
    str+="!@#$%^&*()_{}~`?></|;"
  }
  for(let i=1;i<=leng;i++){
    let char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
  }
   Setpassword(pass)
},[leng,isNumber,isChar,Setpassword])

useEffect(()=>{generatePassword()},[leng,isNumber,isChar,generatePassword])
let p=useRef(null)
// callback stays the same function unless dependencies change.
let copypassword=useCallback(()=>{
   p.current?.select()// for highliting the text when selected 
 //// for selection only 4 characters
//  p.current?.focus()
  //p.current?.setSelectionRange(0,4) 
  window.navigator.clipboard.writeText(password)
},[password])
  return (
  <>
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-black bg-white">
<h1 className='text-black text-center text-xl'>Password Generator</h1>
  </div>
    

    <div className='className=" flex shadow rounded-lg overflow-hidden mb-4 "'>
      <input
  type="text"
  name="password"
  value={password}
  className='outline-none w-full py-1 px-3 '
  placeholder='password'
  readOnly
  ref={p}
/>

<button onClick={copypassword}  >Copy password</button>
     </div>
    <br></br>
  <div className='flex text-sm gap-x-2'>
    <div className='flex text-center gap-x-1'><input type="range"
    min={6}
    max={100}
    value={leng}
    className='cursor-pointer'
    onChange={(e)=>setLength(e.target.value)} />
    <label htmlFor="lenght" className='text-base'>Length:{leng}</label>
    </div>
    <div className='flex text-center gap-x-1'><input type="checkbox" 
    defaultChecked={isNumber}
    value={isNumber}
    onChange={()=>{setNumber((prev)=>!prev);}}/>
     <label htmlFor="number" className='text-base'>Number</label></div>
   
  </div>
  <div className='flex text-center gap-x-1'><input type="checkbox" 
    defaultChecked={isChar}
    onChange={()=>{setChar((prev)=>!prev);}}/>
    <label htmlFor="character" className='text-base'>Character</label>
  </div>
  <div>
    <button onClick={generatePassword}>Generate Password</button>
  </div>
  </>
)

}

export default App
