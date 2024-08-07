"use client"
const CreateForm = () => {
  return (
    <div className='mt-5'>
        <form>
            <div className='mb-5 w-full'>
                <label htmlFor="name">Name</label><br />
                <input type="text" id="name" name="name" className="input input-bordered block w-full" />
                <div id="name-error" aria-live="polite" aria-atomic="true">
                    <p className="text-red-500 mt-2 text-sm"></p>
                </div>
            </div>
            <div className='mb-5'>
                <label htmlFor="phone">Phone</label><br />
                <input type="text" id="phone" name="phone" className="input input-bordered w-full" />
                <div id="phone-error" aria-live="polite" aria-atomic="true">
                    <p className="text-red-500 mt-2 text-sm"></p>
                </div>
            </div>
            <div id="message-error" aria-live="polite" aria-atomic="true">
                <p className="text-red-500 mt-2 text-sm"></p>
            </div>
            
        </form>
    </div>
  )
}

export default CreateForm
