export const broadcast = (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
}