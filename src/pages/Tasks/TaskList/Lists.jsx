import React from 'react';

const Lists = ({tasks, thead, sortClick, listClick}) => <table>
    <thead>
    <tr>
        {thead.map(th => <th
            onClick={th.value ? (() => sortClick(th.id, th.value)) : undefined}
            style={{cursor: "pointer"}}
            key={th.id}>{th.name}
            {((th.sortField === th.value) && (th.id !== 3)) && <i
                style={{fontSize: '15px', position: 'relative', top: '2px', left: '5px'}}
                className="material-icons">
                {th.sortDirection === 'asc' ? 'arrow_downward' : 'arrow_upward'}
            </i>}
        </th>)}
    </tr>
    </thead>

    <tbody>
    {tasks.map(task => (
        <tr key={task.id} onClick={() => listClick(task.id)} className="taskList">
            <td>{task.username}</td>
            <td>{task.email}</td>
            <td style={{maxWidth: '214px', overflow: 'hidden'}}>{task.text}</td>
            <td>
                <label>
                    <input type="checkbox"
                           defaultChecked={((task.status === 10) || (task.status === 11)) ? true : false}/>
                    <span/>
                </label>
            </td>
        </tr>
    ))}
    </tbody>
</table>

export default Lists;
