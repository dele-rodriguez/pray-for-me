import { useState , useEffect } from 'react';
import './firebaseconfig.js';
import './App.css';
import {getFirestore , setDoc , doc , updateDoc,onSnapshot} from "firebase/firestore";

function App() {
  const db = getFirestore();
  const [count, setCount] = useState();
  const  collectionRef= doc(db, "myCollection", "store");
  const [mystery , setMystery] = useState(""); 
  const [ishidden , setIsHidden] = useState(true);

  useEffect(() => {
    onSnapshot(doc(db, "myCollection", "store"), (doc) => {
      setCount( doc.data().number)
    });
    const today = new Date().getDay();
    if (today == 0 || today === 3) {
      setMystery("Glorious");
    } else if (today == 1 || today === 5) {
      setMystery("Joyful");
    } else if (today == 2 || today === 6) {
      setMystery("Sorrowful");
    } else {
      setMystery("Luminious");
    }
  }, []);

  useEffect(() => {
    if (!ishidden) {
      const timeoutId = setTimeout(() => {
        setIsHidden(true);
      }, 30000);
  
      return () => clearTimeout(timeoutId); // Cleanup function to clear the timeout on component unmount or when ishidden changes
    }
  }, [ishidden]);

  // const setData = async () => {
  //   try {
  //     await setDoc(doc(db, "myCollection", "store"), {
  //       number: 0
  //     });
  //     console.log("Document successfully written!");
  //   } catch (e) {
  //     console.error("Error writing document: ", e);
  //   }
  // };

  const handleIncrement = async () => {
    const newCount = count + 1;
    setCount(newCount);
    try {
      await updateDoc(collectionRef, {
        number: newCount
      });
      alert("Your Prayer has been Tracked Successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  function copyText(e) {

    // Copy the text to the clipboard
    navigator.clipboard.writeText(e)
    .then(() => {
      // Alert the user that the text has been copied
      alert("Number copied to clipboard");
    })
    .catch(err => {
      // Handle any errors
      console.error('Failed to copy text: ', err);
    });
  }

  return (
    <>
      <section className='bg flex flex-col justify-center items-center font-josefin relative text-white bg-scroll text-base'> 
        <div className={`${ishidden ? "hidden" : "fixed"} bg-yellow border-2 border-green  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[320px] px-3 rounded-xl h-[330px] flex flex-col justify-around items-center`}>
          <p>
            O God, you granted your servant Montse the grace of serene and cheerful dedication to your will with admirable simplicity in everyday life. Grant that I may lovingly offer to you all my daily activity and convert it into Christian service for others. Deign to glorify your servant Montse and through her intercession grant me the favor I ask of you… (here make your request). Amen.
          </p>
          <p>
            Our Father, Hail Mary, Glory be to the Father
          </p>
        </div>
        <div className='flex flex-col md:flex-row-reverse md:h-[100vh]'>
          <div className='bg-yellow w-full flex flex-col justify-center items-center md:items-start p-4 px-3 md:px-0 md:w-[40%]'>
            <h1 className='font-frank text-lg uppercase md:hidden mb-4'>1000 Rosary Tracker For Fr. Tobe</h1>
            <img className='w-[250px] h-[280px] md:h-[80%] md:w-[90%] items-center justify-self-center md:justify-self-start' src="/Fr.Tobe.jpg" alt="Fr-Tobe's picture" />
          </div>
          <div className='bg-green p-6 px-4 md:w-[60%]'>
            <h1 className='font-frank text-lg uppercase hidden md:block mb-3'>1000 Rosary Tracker For Fr. Tobe</h1>
            <div className="h-[570px] min-[450px]:h-[500px] min-[500px]:h-[450px] min-[640px]:h-[370px] md:h-[480px] lg:h-[450px] about flex flex-col items-center justify-around">
              <p>Fr Tobe Okoye is a priest of the prelature of Opus Dei ordained on May 9 2015. He serves as the chaplain of the Akoka Study Centre Yaba Lagos and Afara Leadership Centre Yaba Lagos.He was recently diagnosed with Myeloma, a form of blood cell cancer that would require further medical assessment and care at,  Clínica Universidad de Navarra, Madrid Spain.</p>
              <p> We wish to accompany him at this period with a lot of care and affection. Kindly join us in the care for Fr Tobe through</p>
              <div>
                <p className='mb-3'>1. Your prayers. If you have completed reciting the <span className='text-red italic font-frank'>{mystery}</span> mystery, kindly click the 'Add Prayer' button to register your prayer in the counter.</p>
                <p className='mb-3'>2. Your contributions which can also be made through the bank details provided in the footer section of the page.</p>
                <p className='mb-3'>3. Taking a moment to say the <span className='text-red italic font-frank'>private prayer of devotion</span>, inspired by Montse Grases.</p>
              </div>
            </div>
            <div className='flex justify-around mt-2'>
              <button 
                className='bg-red w-[100px] md:w-[130px] p-2 rounded-lg' 
                onClick={handleIncrement}
              >
                Add prayer 
              </button>
              <button
                className='bg-yellow w-[200px] md:w-[230px] p-2 rounded-lg'
                onClick={() => {setIsHidden((prev) => !prev )}}
              >
                Private Devotion Prayer
              </button>
            </div>
            <div className='py-3'>
              <h2 className='font-frank text-lg pb-2'>{`Progress: ${1000 - count} Mysteries left`}</h2>
              <div className='w-full h-2 bg-slate-500 rounded-lg'>
                <div style={{
                  width:`${count/1000 * 100}%`
                }} className={` bg-yellow h-2 rounded-lg`}></div>
              </div>
            </div>
          </div>
        </div>
        <section className="footer w-full bg-yellow p-4 pb-2 px-3 flex flex-col justify-evenly h-[500px] sm:h-[270px]">
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 place-items-start'>
            <div className="naira flex flex-col justify-center">
              <h4>Denomination: Naira</h4>
              <p>Bank: Stanbic IBTC Bank</p>
              <p>Account Name: Kuramo Development Trust</p>
              <p>Account Number: <span className='text-red' onClick={() => copyText('0035063422')}>0035063422</span></p>
            </div>
            <div className="dollar flex flex-col justify-center">
              <h4>Denomination: US Dollar</h4>
              <p>Bank: Stanbic IBTC Bank</p>
              <p>Swift Code: SBICNGLX</p>
              <p>Acc Name: Kuramo Development Trust</p>
              <p>Acc Number: <span className='text-red' onClick={() => copyText('0035063439')}>0035063439</span></p>
            </div>
            <div className="corresponding-bank flex flex-col justify-center">
              <h4>Corresponding Bank: Citibank N.A.</h4>
              <p>Address: 111 Wall Street, New York</p>
              <p>Swift Code: CITIUS33</p>
              <p>ABA: 021000089</p>
              <p>Account Number: <span className='text-red' onClick={() => copyText('36127476')}>36127476</span></p>
            </div>
          </div>
          <p>For more information contact Chima Ikenganyia <span className="text-red"><a href="tel:+234 706 7008778">+234 706 7008778</a></span></p>
        </section>
      </section>
    </>
  )
}

export default App