const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec']

export function getDateString(timestamp){
  const d = new Date(timestamp)

  return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() +
         ' ' + d.toLocaleTimeString()
}
