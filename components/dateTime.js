import { isValid, parseISO, format } from 'date-fns'

export default function DateTime({ dateString }) {
  if (!isValid(parseISO(dateString))) {
    return 'No time'
  }
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLL do, yyyy - HH:mm')}</time>
}
