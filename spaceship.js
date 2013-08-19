
/**
Корабли и планеты
*/

var Planets = [];
var Vessels = [];


/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
	this.name = name;
	this.position = position;
	this.capacity = +capacity;

	this.cargo = 0;
	this.planetName = '';
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
	var currentCargo = (this.cargo > 0) ? 'Занято ' + this.cargo + 'т из ' + this.capacity : 'товаров нет';
	var currentLocation = this.position.toString();
	
	for(var i = 0; i<Planets.length; i++)
	if(Planets[i].position == this.position.toString()) currentLocation = Planets[i].name;
	
	return this.name + ' Местоположение: ' + currentLocation + ' Груз: ' +  currentCargo;
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
	return this.capacity - this.cargo;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
	return this.cargo;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {

	if(newPosition instanceof Array)
	{
		this.position = newPosition;
	}

	if(newPosition instanceof Planet)
	{
		this.position = newPosition.position;
		this.planetName = newPosition.name;
	}
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
	this.name = name;
	this.position = position;
	this.availableAmountOfCargo = +availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
	var pCargo = (this.availableAmountOfCargo > 0) ? this.availableAmountOfCargo + ' т' : 'Груза нет';
	return 'Планета: ' + this.name + ' Местоположение: ' + this.position + ' Груз: ' + pCargo;
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
	return this.availableAmountOfCargo;
}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {

	if(vessel && ( vessel.position === this.position) && (vessel.getFreeSpace() >= cargoWeight) && this.availableAmountOfCargo >= cargoWeight)
	{
	 	vessel.cargo += cargoWeight;
		this.availableAmountOfCargo -=	cargoWeight;
	}
	else
	{
		var errs = 'Произошли ошибки: \n';
		
		if(!vessel) errs += 'Не задан корабль для загрузки'; 
		if(vessel.position !== this.position) errs += '\n' + 'Корабль не прибыл на планету';  
		if(vessel.getFreeSpace() < cargoWeight) errs += '\n' + 'На корабле недостаточно свободного места'; 
		if(this.availableAmountOfCargo < cargoWeight) errs += '\n' + 'На планете недостаточно груза'; 

		alert(errs);
	}
}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
	if(vessel && ( vessel.position === this.position) && cargoWeight <= vessel.cargo )
	{
		vessel.cargo -= cargoWeight;
		this.availableAmountOfCargo += 	cargoWeight;
	}
        else 
	{
		var errs = 'Произошли ошибки: \n';

		if(!vessel) errs += 'Не задан корабль для загрузки';
		if(vessel.position !== this.position) errs += '\n' + 'Корабль не прибыл на планету'; 
		if(cargoWeight > vessel.cargo ) errs += '\n' + 'На корабле недостаточно груза'; 

		alert(errs);
	}
}
