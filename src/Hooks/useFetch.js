const useEffect = ({type = 'GET', api_key = '', url = '', data = '',}) => {
	const fetchApi = async () => {
		fetch("https://todos-9a65.restdb.io/rest/todos", {
                    method: type,
                    headers: {
                      "x-apikey": api_key,
                      "Cache-Control": "no-cache",
                      "content-type": "application/json"
                    },
                    credentials: "same-origin"})
                  .then(res => res.json())
                  .then(data => setTodos([...data]))
                  .catch(error => console.log(error.message));
                  }
	}
export default useEffect;