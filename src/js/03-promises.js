import Notiflix from 'notiflix';

const form=document.querySelector('.form');

form.addEventListener('submit',onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const amountMasses=[];

  const {
    elements: { step, delay, amount  }
    } = evt.currentTarget;

  for (let i = 0; i <amount.value; i += 1){
      const delayI=delay.value*1;
      const stepI=step.value*1
      const delayT=delayI + stepI*i;
      amountMasses.push({position:i+1, delay:delayT })
  }

  // console.log(amountMasses);

  for (const { position, delay } of amountMasses){
      createPromise(position,delay)
      .then(resolve => Notiflix.Notify.success(resolve))
      .catch(reject=>Notiflix.Notify.failure(reject));
  }

}

function createPromise(position,delay){
return new Promise ((resolve,reject)=>{
  const shouldResolve = Math.random() > 0.3;

  setTimeout(()=>{

          if (shouldResolve) {
          resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
          } 
          
          reject (`❌ Rejected promise ${position} in ${delay}ms`);
          
        },delay);

});

}