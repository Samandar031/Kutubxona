func = async () => {
  const url = await fetch("http://127.0.0.1:8004/api/v1/consol");
  const res = await url.json();
  console.log(res);
};
func();
