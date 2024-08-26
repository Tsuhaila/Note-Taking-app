import React, { useState } from 'react'

export const Home = () => {
    const [create, setCreate] = useState(false)
    const [createbutton, setCreatebutton] = useState(true)
    const [card, setCard] = useState(true)

    const initialValues = {
        title: "",
        description: "",
        backgroundcolor: ""
    }
    const [formValues, setFormValues] = useState(initialValues)
    const [values, setValues] = useState([])
    const [edit, setEdit] = useState(null)


    const handleCreate = () => {
        setCreate(true)
        setCreatebutton(false)
        setCard(false)
    }
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        console.log(formValues)
    }
    const handleSubmit = (e) => {
        setCard(true)
        e.preventDefault()
        if (edit !== null) {
            const updatedValues = values.map((value, index) =>
                index === edit ? formValues : value

            )
            setValues(updatedValues)
            setCreatebutton(true)
            setEdit(null)
        } else {
            setValues([...values, formValues])
            setCreatebutton(true)
            console.log(values)


        }
        setCreate(false)
        setFormValues(initialValues)


    }

    const handleEdit = (ind) => {
        setEdit(ind)
        setCreatebutton(false)
        setCreate(true)
        setCard(false)
        setFormValues(values[ind])

    }
    const handleDelete = (ind) => {
        setValues(values.filter((_, index) => index !== ind))
    }
    return (
        <div className=' h-screen w-screen'>
            {createbutton && (

                <div className='text-center'>
                    <button type='button' className='bg-gray-700 text-white font-bold py-2 px-4 mt-16 rounded hover:bg-gray-900' onClick={handleCreate}>Create Note</button>
                </div>

            )}

            {create && (
                <div>

                    <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
                        <div className='mb-5 mt-16'>
                            <label className='block mb-2 text-sm font-medium'>Title</label>
                            <input required type='text' name='title' placeholder='Enter title' className='block w-full p-4  border rounded-lg hover:bg-slate-50 ' onChange={handleChange} value={formValues.title}></input>
                        </div>
                        <div>
                            <label className='block mb-2 text-sm font-medium '>Description</label>
                            <textarea required cols='15' rows='4' name='description' placeholder='Enter description' className='block w-full p-4 border rounded-lg hover:bg-slate-50 ' onChange={handleChange} value={formValues.description}></textarea>
                        </div>

                        <div>
                            <label className='block mb-2 text-sm font-medium '>Background color</label>
                            <select required onChange={handleChange} name='backgroundcolor' className='block w-full p-4 border rounded-lg hover:bg-slate-50 ' value={formValues.backgroundcolor}>
                                <option value=''>select color</option>
                                <option value='red'>red</option>
                                <option value='green'>green</option>
                                <option value='yellow'>yellow</option>
                                <option value='blue'>blue</option>
                            </select>
                        </div>
                        <div>
                            <button className='bg-green-500 text-white font-bold py-2 px-4 rounded mt-3 hover:bg-green-600' type='submit'>Save</button>
                        </div>

                    </form>
                </div>

            )}

            {card && (
                <div className='flex gap-5 mt-36'>

                    {values.map((value, ind) => (
                        <div className=' w-auto p-16 bg-white border border-gray-200 rounded-lg shadow' key={ind} style={{ background: value.backgroundcolor }}>
                            <h5 class="mb-2 text-2xl  font-bold">{value.title}</h5>
                            <p class="font-normal">{value.description}</p>
                            <div className='mt-6'><button className=' text-blue-900 font-bold py-2 px-4 rounded bg-white hover:bg-slate-50' onClick={() => handleEdit(ind)}>Edit</button>
                                <button className=' text-red-800 font-bold py-2 px-4 ml-5 rounded bg-white hover:bg-slate-50' onClick={() => handleDelete(ind)}>Delete</button></div>
                        </div>
                    ))}
                </div>
            )}

        </div>

    )
}
