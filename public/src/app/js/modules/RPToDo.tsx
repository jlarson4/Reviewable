declare function require(name:string): any;

import * as React from 'react'
import 'whatwg-fetch'

const velocity = require('velocity-react')

interface Body { has_modal: boolean; data_type: string;}

export interface IRPToDoProps { body_data: Body; main_menu: string; page_headline: Array<string>; site_name: string; images_dir: string; header_id: string; to_do: string[]; }
export interface IRPToDoState { 
	isMobile: boolean; 
	showModal: boolean; 
	descriptionOpened: number; 
	menuOpened: number; 
	items: string[]; 
	activeDescription: boolean[]; 
	activeMenu: boolean[];
	currentStatus: number;
}
export class RPToDo extends React.Component<IRPToDoProps, IRPToDoState> {
	constructor(props: any) {
		super(props)
		let isMobile = false
		if (window.innerWidth < 770) {
			isMobile = true
		}
		let l = this.props.to_do.length
		let false_array = new Array(l)
		for(l > 0; l--;) false_array.push(false);

		this.state = {
			isMobile: isMobile,
			showModal: false,
			descriptionOpened: -1,
			menuOpened: -1,
			items: this.props.to_do,
			activeDescription: false_array,
			activeMenu: false_array,
			currentStatus: 1,
		}
	}


	componentDidMount() {
		document.getElementById('menu-item-1').addEventListener('click', this.activeInProgress.bind(this))
		document.getElementById('menu-item-2').addEventListener('click', this.activeCompleted.bind(this))
		document.getElementById('menu-item-3').addEventListener('click', this.activeDismissed.bind(this))
	}

	render() {

		return (
			<div className="span_12 tabl">
				<div className="span_10 cell">
					{this.renderModal()}
					<div id="items-container" className="span_10 content">
						{this.renderListItems(this.state.items)}
					</div>
				</div>
			</div>
		)
	}

	renderModal() {
		const agent = navigator.userAgent.toLowerCase()
		let taskTitle = '';
		let taskDescription = '';
		if(agent.indexOf("msie") > -1){
			taskTitle = 'Task Title'
			taskDescription = 'Task Description'
		}

		return (
			<velocity.VelocityComponent animation={{ width: this.state.showModal ? "100%" : "0%" }} duration={ 250 } delay={125}>
				<div id="modal-overlay" onClick={this.deactivateModal.bind(this)}>
					<velocity.VelocityComponent animation={{ opacity: this.state.showModal ? "1" : "0" }} duration={ 250 } >
						<div className="span_6 content modal-content">
							<h2> Add To-Dos </h2>
							<form method="post" action="" encType="multipart/form-data" id="add-form">
								<label className="span_12 colWrap add-task-area"> {taskTitle}
									<input name="title" type="text" id='task-title-input' className="task-field" placeholder="Task Title" autoFocus required/>
								</label>
								<label className="span_12 colWrap add-task-area"> {taskDescription}
									<textarea name="description" id='task-description-input' className="task-field" placeholder="Task Description"/>
								</label>
								<input type="submit" id='task-submit-button' onClick={this.taskSubmitted.bind(this)} className="span_4" value="Add Task"/>
							</form>
						</div>
					</velocity.VelocityComponent>
				</div>
			</velocity.VelocityComponent>
		)
	}

	renderListItems(items: any){
		let temp = (
			<div key='to-do-list'>
				<ul className="to-do-list">
					<velocity.VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
						{this.renderItems(items)}
						{this.renderAddNew()}
					</velocity.VelocityTransitionGroup>
				</ul>
			</div>
		)
		let completedList = [] as any
		let dismissedList = [] as any
		let inProgressList = [] as any
		if(this.state.currentStatus == 1){
			inProgressList.push(temp)
		} else if(this.state.currentStatus == 2) {
			completedList.push(temp)
		} else if(this.state.currentStatus == 3) {
			dismissedList.push(temp)
		}
		return(
			<div>
				<velocity.VelocityTransitionGroup enter={{animation: "slideDown", duration: 600}} leave={{animation: "slideUp", duration: 600}}>
					<div key="inprogress" className="span_12 mobile mobile-menu-item"><h5 className="span_12 mobile" id="inprogress" onClick={this.activeInProgress.bind(this)}>In Progress</h5></div>
					{inProgressList}
					<div key="completed" className="span_12 mobile mobile-menu-item"><h5  className="span_12 mobile" id="completed" onClick={this.activeCompleted.bind(this)}>Completed</h5></div>
					{completedList}
					<div key="dismissed" className="span_12 mobile mobile-menu-item"><h5  className="span_12 mobile" id="dismissed" onClick={this.activeDismissed.bind(this)}>Dismissed</h5></div>
					{dismissedList}
				</velocity.VelocityTransitionGroup>
			</div>
		)
	}

	renderItems(items: any){
		let num = 0
		let list = [] as any
		items.map(function(item: any){
			num++
			list.push(this.renderItem(item, num))
		}.bind(this))
		return list
	}

	renderItem(item: any, num: number){
		if(item['status'] == this.state.currentStatus){
			return (
				<li key={item['ToDo_id']} className="span_12">
					<velocity.VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
						<h6 key={'item-' + item['ToDo_id']} id={'item-'+num} className="to-do-item span_12 colWrap" onClick={this.openDescription.bind(this)}>
							{this.renderDescriptionIcon(num)}
							{item['title']}
							{this.renderMenuIcon(item, num)}
						</h6>
						<velocity.VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
							{this.renderMenu(item, num)}
						</velocity.VelocityTransitionGroup>
						{this.renderDescription(item, num)}
					</velocity.VelocityTransitionGroup>
				</li>
			)
		}
	}

	renderMenuIcon(item: any, num: number){
		return <a><span className="icon icon-menu" id={'itemMenu-'+num} onClick={this.openMenu.bind(this)}></span></a>
	}

	renderMenu(item: any, num: number){
		if(num == this.state.menuOpened){
			return (
				<div onMouseLeave={this.closeMenu.bind(this)}>
					<div id={'item-menu-'+ num} className='item-menu status-menu'>
						<form method="post" action="" id={'item-menu-'+item['ToDo_id']} encType="multipart/form-data">
							<div className="checkboxes">
								<input type="radio" name="status" value="1" id="option-1"  className="status-menu" defaultChecked={this.isChecked(item['status'], 1) ? true : false}/>
								<label htmlFor="option-1" className="check-label span_12 status-menu">
									<span className="status-menu"></span>In Progress
								</label>

								<input type="radio" name="status" value="2" id="option-2"  className="status-menu" defaultChecked={this.isChecked(item['status'], 2) ? true : false}/>
								<label htmlFor="option-2" className="check-label span_12 status-menu">
									<span className="status-menu"></span>Completed
								</label>

								<input type="radio" name="status" value="3" id="option-3"  className="status-menu" defaultChecked={this.isChecked(item['status'], 3) ? true : false}/>
								<label htmlFor="option-3" className="check-label span_12 status-menu">
									<span className="status-menu"></span>Dismiss Task
								</label>

								<input type="radio" name="status" value="4" id="option-4"  className="status-menu"/>
								<label htmlFor="option-4" className="check-label span_12 status-menu">
									<span className="status-menu"></span>Delete Task
								</label>

								<input type="hidden" name='item-id' value={item['ToDo_id']}/>
							</div>
						</form>
					</div>
					<div className="arrow-right"></div>
				</div>
			)
		}
	}

	renderDescriptionIcon(num: number){
		if(num == this.state.descriptionOpened){
			return <span className="icon icon-left to-do-item-arrow"  onClick={this.openDescription.bind(this)}></span>
		} else {
			return <span className="icon icon-down to-do-item-arrow"  onClick={this.openDescription.bind(this)}></span>
		}
	}

	renderDescription(item: any, num: number){
		if(num == this.state.descriptionOpened){
			return (
				<div id={'item-description-'+num} className='description span-12'><p>{item['description']}</p></div>
			)
		}
	}

	renderAddNew() {
		if(this.state.currentStatus == 1){
			return (
				<li key='add-new' id="add-new" className="span_12">
					<h6 id="add-new-headline" onClick={this.activateModal.bind(this)}><span className="icon icon-plus" onClick={this.activateModal.bind(this)}></span> Add New </h6>
				</li>
			)
		}
	}

	isChecked(status: number, value: number){
		return status == value
	}

	activeInProgress() {		
		this.setState({ currentStatus : 1})
	}
	activeCompleted() {		
		this.setState({ currentStatus : 2})
	}
	activeDismissed() {		
		this.setState({ currentStatus : 3})
	}

	activateModal(event: any){
		event.preventDefault()
		let titleElement = document.getElementById('task-title-input') as HTMLInputElement
		titleElement.focus();
		this.setState({ showModal: true })
	}

	deactivateModal(event: any){
		event.preventDefault()
		let titleElement = document.getElementById('task-title-input') as HTMLInputElement
		let title = titleElement.value
		if(event.target.id == 'modal-overlay'){
				this.setState({ showModal: false })
		} else if (event.target.id == 'task-submit-button'){
			if(title != ''){
				this.setState({ showModal: false })
				titleElement.classList.remove("error")
			} else {
				titleElement.classList.add("error")
			}
		}
	}

	openMenu(event: any){
		let el = event.target;
		let id = el.id.split('-')[1]
		this.setState({ menuOpened: id })
	}

	closeMenu(event: any){
		this.statusUpdated()
		this.setState({ menuOpened: -1 })
	}

	openDescription(event: any){
		let el = event.target;
		let new_id = null as any
		let array = this.state.activeDescription
		let old_id = this.state.descriptionOpened

		if(el.className.indexOf("to-do-item-arrow") > -1){
			new_id = el.parentNode.id.split('-')[1]
		} else {
			new_id = el.id.split('-')[1]
		}

		if(this.state.descriptionOpened != -1){
			array[old_id] = false
		}

		if(old_id != new_id){
			array[new_id] = true
			this.setState({ descriptionOpened: new_id })
		} else {
			this.setState({ descriptionOpened: -1 })
		}

		this.setState({ activeDescription: array })
	}

	taskSubmitted(event: any){
		let titleElement = document.getElementById('task-title-input') as HTMLInputElement
		let title = titleElement.value
		let descriptionElement = document.getElementById('task-description-input') as HTMLInputElement
		let description = descriptionElement.value
		let form = document.getElementById('add-form') as HTMLFormElement
		if(title != ''){
			fetch('/wp-admin/admin-ajax.php?action=addToDo', {
				method: 'POST',
				body: new FormData(form)
			}).then(function(response: any){
				response.json().then(function(result: any){
					let new_items = this.state.items
					new_items.unshift(result)
					this.setState({ items: new_items })
				}.bind(this))
			}.bind(this))
			this.deactivateModal(event)

			let menuList = this.state.activeMenu
			let descriptionList = this.state.activeDescription

			menuList.push(false)
			descriptionList.push(false)
			this.setState({ activeMenu: menuList })
			this.setState({ activeDescription: descriptionList })
			descriptionElement.value = ''
			titleElement.value = ''
		}
		
	}

	statusUpdated(){
		let element_id = this.state.menuOpened
		let el = document.getElementById('item-menu-' + element_id)
		let form = el.firstChild as HTMLFormElement
		let db_id = form.id.split('-')[2]
		let data = new FormData(form)
		fetch('/wp-admin/admin-ajax.php?action=updateToDo', {
			method: 'POST',
			body: data
		}).then(function(response: any){
			response.json().then(function(result: any){
				let updated_items = this.state.items.map(function(item: any){
					if(item['ToDo_id'] == db_id){
						item['status'] = result['status']
					}
					return item
				}.bind(this))
				this.setState({ items: updated_items })
			}.bind(this))
		}.bind(this))
	}
}