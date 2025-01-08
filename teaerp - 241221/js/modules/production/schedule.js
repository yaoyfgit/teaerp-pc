// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initSchedule();
    loadAttendance();
    loadEmployees();
});

// 初始化排班表
function initSchedule() {
    const shifts = ['早班(8:00-16:00)', '中班(16:00-24:00)', '夜班(0:00-8:00)'];
    const grid = document.getElementById('scheduleGrid');
    
    shifts.forEach(shift => {
        const row = document.createElement('div');
        row.className = 'schedule-row';
        
        const timeCell = document.createElement('div');
        timeCell.className = 'time-column';
        timeCell.textContent = shift;
        row.appendChild(timeCell);
        
        // 添加7天的单元格
        for (let i = 0; i < 7; i++) {
            const cell = document.createElement('div');
            cell.className = 'schedule-cell';
            cell.setAttribute('data-shift', shift);
            cell.setAttribute('data-day', i);
            row.appendChild(cell);
        }
        
        grid.appendChild(row);
    });
    
    loadScheduleData();
}

// 加载排班数据
function loadScheduleData() {
    // 模拟数据
    const schedules = [
        {
            shift: '早班(8:00-16:00)',
            day: 0,
            employees: ['张三', '李四']
        },
        {
            shift: '中班(16:00-24:00)',
            day: 0,
            employees: ['王五', '赵六']
        }
    ];
    
    schedules.forEach(schedule => {
        const cell = document.querySelector(`.schedule-cell[data-shift="${schedule.shift}"][data-day="${schedule.day}"]`);
        if (cell) {
            cell.innerHTML = `
                <div class="employee-list">
                    ${schedule.employees.map(emp => `<span class="employee-tag">${emp}</span>`).join('')}
                </div>
            `;
        }
    });
}

// 加载考勤数据
function loadAttendance() {
    // 模拟数据
    const attendance = [
        {
            id: 'E001',
            name: '张三',
            department: '生产部',
            position: '操作工',
            required: 22,
            actual: 20,
            late: 1,
            early: 0,
            leave: 1,
            overtime: 2
        }
    ];
    
    const tbody = document.getElementById('attendanceTable');
    tbody.innerHTML = attendance.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.department}</td>
            <td>${item.position}</td>
            <td>${item.required}</td>
            <td>${item.actual}</td>
            <td>${item.late}</td>
            <td>${item.early}</td>
            <td>${item.leave}</td>
            <td>${item.overtime}</td>
        </tr>
    `).join('');
}

// 加载员工列表
function loadEmployees() {
    // 模拟数据
    const employees = [
        { id: 'E001', name: '张三' },
        { id: 'E002', name: '李四' },
        { id: 'E003', name: '王五' },
        { id: 'E004', name: '赵六' }
    ];
    
    const select = document.querySelector('select[name="employee"]');
    employees.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.id;
        option.textContent = emp.name;
        select.appendChild(option);
    });
}

// 上一周
function prevWeek() {
    // TODO: 切换到上一周
    console.log('上一周');
    loadScheduleData();
}

// 下一周
function nextWeek() {
    // TODO: 切换到下一周
    console.log('下一周');
    loadScheduleData();
}

// 保存排班
function saveSchedule() {
    const form = document.getElementById('scheduleForm');
    const formData = new FormData(form);
    const schedule = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存排班
    console.log('保存排班:', schedule);
    
    hideModal('scheduleModal');
    loadScheduleData();
    showMessage('排班已保存');
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 