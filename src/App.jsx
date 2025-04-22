import { use, useState,useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const passwordRef = useRef(null)
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str+= "0123456789"
    if (charAllowed) str+= "!@#$%^&*()_+-=[]{}|;:',.<>?/~`"
    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password) 
  }, [password])
useEffect(() => {
  passwordGenerator()
}, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-cyan-950 max-[600px]:my-12'>
      <h1 className="text-center text-white my-5 text-2xl">Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text" 
          value={password} 
          className='outline-none w-full py-1 px-3 text-rose-600 bg-white' 
          placeholder='Password' 
          readOnly 
          ref={passwordRef}
          />
          <button className='cursor-pointer outline-none bg-[oklch(0.59_0.15_67.05)] text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 justify-center text-sky-200 max-[600px]:flex-col max-[600px]:text-center max-[600px]:items-center'>
          <div className='flex items-center gap-x-2 max-[600]: my-1'>
            <input type="range" min={8} max={64} value={length} className='cursor-pointer accent-[oklch(0.59_0.15_67.05)]' onChange={(e) => {setLength(e.target.value)}} />
            <label>Length: {length}</label>
          </div>
          <div className='flex gap-x-2 max-[600]: my-2 max-[600]:justify-center' >
            <div className='flex items-center gap-x-1 max-[600]:justify-center'>
              <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={() => {setNumberAllowed((prev) => !prev)}} />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className='flex items-center gap-x-1 max-[600]:justify-center'>
              <input type="checkbox" defaultChecked={charAllowed} id="characterInput" onChange={ ()=> { setCharAllowed((prev) => !prev)}} />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
