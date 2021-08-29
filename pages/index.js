import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const index = () => {
  const { register, handleSubmit, errors } = useForm()
  const [values, setValues] = useState([])
  const onSubmit = (data, e) => {
    setValues((prev) => {
      let oldArr = [...prev]
      oldArr.push({ todo: data.todo, done: false })
      return oldArr
    })
    e.target.reset()
  }

  const onDone = (index) => {
    setValues((prev) => {
      let oldArr = [...prev]
      oldArr.splice(index, 1, { todo: prev[index].todo, done: true })
      return oldArr
    })
  }
  return (
    <div className='container'>
      <h1 className='todo-title'>todo list App</h1>
      <form className='todo-form' onSubmit={handleSubmit(onSubmit)}>
        <input
          className='form-input'
          name='todo'
          ref={register({ required: true })}
        />{' '}
        <input value='⮞' className='form-submit' type='submit' />{' '}
        <button
          className='form-reset'
          type='button'
          onClick={() => setValues([])}
        >
          ✕
        </button>
      </form>
      {errors.todo && 'enter text*'}
      <br />
      <div className="items-container">

      {values.length > 0 ? (
        values.map((item, index) => {
          if (item.done) {
            return (
              <li className='item' key={index}>
                <del>{item.todo}</del>
              </li>
            )
          } else {
            return (
              <li className='item' key={index}>
                {item.todo}{' '}
                <button className='done-btn' onClick={() => onDone(index)}>
                  ✓
                </button>
              </li>
            )
          }
        })
      ) : (
        <li className='item'>No Item</li>
      )}
      </div>
    </div>
  )
}

export default index
