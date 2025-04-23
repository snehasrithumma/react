
// An API is given which is unstable which either resolves 10ms or 1sec. 
// Need to create a Circuit Breaker which will wait for 300ms and if API is resolved within the timeframe
//  we return the data otherwise we throw an error or retry.
  
  const api = () => {
    const delay = Math.random() < 0.5 ? 10 : 1000;
    return new Promise((resolve)=> setTimeout(()=>resolve('resolved'), delay))
  }
  
  const withCircuitBreaker = (fn, timeout = 300) => {
    return () => {
      const timeoutPromise = new Promise((_, reject) => setTimeout(()=>reject(new Error('rejected')), timeout))
      return Promise.race([fn(), timeoutPromise])
    }
  }
  
  const callWithBreaker = withCircuitBreaker(api, 300)

  callWithBreaker().then(result => console.log(result))
  .catch(err => console.error(err))