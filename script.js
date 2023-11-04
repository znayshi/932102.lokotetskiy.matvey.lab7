function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];

function generateColor() {
    let hexColor = "#";

    for (let position = 0; position < 6; position++){
        const randomNumber = Math.floor(Math.random() * hexCharacters.length);
        hexColor += hexCharacters[randomNumber];
    }

    return hexColor;
}

class Figure {
    constructor(type, color) {
        this.figure = null;
        this._type = type;
        this._color = color;
        this._size = 0;
    }

    setParams(containerSize) {
        this.figure = document.createElement('div');
        this._size = getRandomArbitrary(50, 200);
        this.setDimensions();
        this.setClasses();
        this.setPosition(containerSize);
    }

    setDimensions() {
        this.figure.style.width = `${this._size}px`;
        this.figure.style.height = `${this._size}px`;
        this.figure.style.backgroundColor = this._color;
    }

    setPosition(containerSize) {
        const leftPos = getRandomArbitrary(this._size, containerSize.x - this._size);
        const topPos = getRandomArbitrary(this._size, containerSize.y - this._size);
        this.figure.style.left = `${leftPos}px`;
        this.figure.style.top = `${topPos}px`;
    }

    setClasses() {
        this.figure.classList.add(this._type);
        this.figure.classList.add('figure');
    }
}

class Rectangle extends Figure {
    setDimensions() {
        this.figure.style.width = `${this._size}px`;
        this.figure.style.height = `${this._size}px`;
        this.figure.style.backgroundColor = 'red';
        this.figure.style.border = '2px solid black';
    }
}

class Triangle extends Figure {
    setDimensions() {
        this.figure.style.borderColor = 'transparent';
        this.figure.style.borderStyle = 'solid';
        this.figure.style.borderWidth = `${this._size / 2}px`;
        this.figure.style.borderBottomColor = this._color;
        this.figure.style.borderBottomColor = 'blue';
    }
}

class Circle extends Figure {
    setDimensions() {
        this.figure.style.width = `${this._size}px`;
        this.figure.style.height = `${this._size}px`;
        this.figure.style.backgroundColor = 'green';
        this.figure.style.borderRadius='50%';
        this.figure.style.border = '1px solid black';
    }
}

class CanvasActions {
    constructor(canvasEl, inputEl) {
        this.canvas = canvasEl;
        this.input = inputEl;
    }

    appendFiguresOnClick(btn) {
        btn.addEventListener('click', () => {
            const figuresNumber = Number(this.input.value) ? Number(this.input.value) : 0;
            
            if (figuresNumber < 1) {
                figuresNumber = 1;
            } else if (figuresNumber > 100) {
                figuresNumber = 100;
            }
            
            const figureColor = generateColor();
    
            for (let i = 0; i < figuresNumber; i++) {
                const figureInstance = this.createFigure(figureColor);
                const containerSize = { x: this.canvas.clientWidth, y: this.canvas.clientHeight };
                figureInstance.setParams(containerSize);
                this.canvas.append(figureInstance.figure);
            }
        });
    }

    createFigure(figureColor) {}
}

class CanvasRectangleActions extends CanvasActions {
    createFigure(figureColor) {
        return new Rectangle('rectangle', figureColor);
    }
}

class CanvasTriangleActions extends CanvasActions {
    createFigure(figureColor) {
        return new Triangle('triangle', figureColor);
    }
}

class CanvasCircleActions extends CanvasActions {
    createFigure(figureColor) {
        return new Circle('circle', figureColor);
    }
}
const inpField = document.querySelector('.inputField');
const rectangleButton = document.querySelector('.butRectangle');
const triangleButton = document.querySelector('.butTriangle');
const circleButton = document.querySelector('.butCircle');
const drawable = document.querySelector('.drawable');
const canRectangle = new CanvasRectangleActions(drawable, inpField);
const canTriangle = new CanvasTriangleActions(drawable, inpField);
const canCircle = new CanvasCircleActions(drawable, inpField);
canRectangle.appendFiguresOnClick(rectangleButton);
canTriangle.appendFiguresOnClick(triangleButton);
canCircle.appendFiguresOnClick(circleButton);

drawable.addEventListener('click', ($event) => {
    if ($event.target.classList.contains('figure')) {
        const el = $event.target;

        if (el.classList.contains('triangle')) {
            el.style.borderBottomColor = 'yellow';
        } else {
            el.style.backgroundColor = 'yellow';
        }
    }
});

drawable.addEventListener('dblclick', ($event) => {
    if ($event.target.classList.contains('figure')) {
        $event.target.remove();
    }
});