const ActionButton = ({ children }) => {
   return (
      <div className='p-1 mr-2 text-gray-500 rounded cursor-pointer hover:bg-gray-200'>
         {children}
      </div>
   )
}
export default ActionButton
