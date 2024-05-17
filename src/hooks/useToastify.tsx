import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Toast from '../components/toast/Toast'
import '../css/toast.css'

function useToastify() {
  const toastMessage = (type: string, message: string) => {
    toast(<Toast type={type} message={message} />)
  }

  return {
    toastMessage,
  }
}

export default useToastify
