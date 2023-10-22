export const register = (req, res) => {
  
  res.sendFile(process.cwd() + '/client/register.html')
}