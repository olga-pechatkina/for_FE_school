class linkedListElement {
    get left() {
        return this._left;
    }
    set left(value) {
        this._left = value;
    }
    get right() {
        return this._right;
    }
    set right(value) {
        this._right = value;
    }

    get val() {
        return this._val;
    }
    set val(value) {
        this._val = value;
    }

    constructor(val) {
        this.val = val;
        this.right = null;
        this.left = null;
    }
}

class linkedList {
    get firstEl() {
        return this._firstEl;
    }
    set firstEl(value) {
        this._firstEl = value;
    }

    constructor(val) {
        if (!Array.isArray(val)) {
            this.firstEl = new linkedListElement(val);
        } else {
            this.firstEl = new linkedListElement(val[0]);
            for (let i =1; i< val.length; i++) {
                this.pushElement(val[i]);
            }
        }
    }

    setFirstElement(val) {
        if (this.firstEl == null) {
            this.firstEl = new linkedListElement(val);
            return;
        }
        return -1;
    }

    getElement(index) {
        let elTemp = this.firstEl;
        while (elTemp && index > 0) {
            elTemp = elTemp.right;
            index--;
        }
        if (index > 0) {
            throw new Error("outOfBoundsException");
        } else {
            return elTemp.val;
        }
    }

    pushElement(val) {
        let elTemp = this.firstEl;
        if (elTemp) {
            while (elTemp.right) {
                elTemp = elTemp.right;
            }
            let newEl = new linkedListElement(val);
            elTemp.right = newEl;
            newEl.left = elTemp;
        }
    }

    unshiftElement(val) {
        let newEl = new linkedListElement(val);
        this.firstEl.left = newEl;
        newEl.right = this.firstEl;
        this.firstEl = newEl;
    }

    insertAfter(val1, val2) {
        let elTemp = this.firstEl,
            newEl = new linkedListElement(val2);
        while (elTemp) {
            if (elTemp.val == val1) {
                this.addAfter(elTemp, newEl);
                return;
            }
            elTemp = elTemp.right;
        }
        throw new Error("outOfBoundsException");
    }

    insertAfterIndex(val, index) {
        let elTemp = this.firstEl,
            newEl = new linkedListElement(val);
        while (elTemp && index >= 0) {
            if (index == 0) {
                this.addAfter(elTemp, newEl);
                return;
            }
            elTemp = elTemp.right;
            index--;
        }
        throw new Error("outOfBoundsException");
    }

    addAfter(el, newEl) {
        let tmpRight = el.right;
        el.right = newEl;
        newEl.right = tmpRight;
        newEl.left = el;
        if (tmpRight) {
            tmpRight.left = newEl;
        }
    }

    makeFirstElement(index) {
        let val;
        try {
            val = this.getElement(index);
        } catch (err) {
            console.log(err);
        }
        this.deleteElementByIndex(index);
        this.unshiftElement(val);
    }

    makeLastElement(index) {
        let val;
        try {
            val = this.getElement(index);
        } catch (err) {
            console.log(err);
        }
        this.deleteElementByIndex(index);
        this.pushElement(val);
    }

    MoveElementAfter(index1, index2) {
        let val;
        try {
            val = this.getElement(index1);
            this.insertAfterIndex(val, index2);
        } catch (err) {
            console.log(err);
        }
        this.deleteElementByIndex(index1);
    }

    isEmpty() {
        return !this.firstEl;
    }

    deleteElementByIndex(index) {
        let elTemp = this.firstEl;
        while (elTemp && index >= 0) {
            if (index == 0) {
                this.deleteElement(elTemp);
                return;
            }
            elTemp = elTemp.right;
            index--;
        }
        throw new Error("outOfBoundsException");
    }

    deleteElementByValue(val) {
        let elTemp = this.firstEl;
        while (elTemp) {
            if (elTemp.val == val) {
                this.deleteElement(elTemp);
                return;
            }
            elTemp = elTemp.right;
        }
        return -1;
    }

    deleteElement(el) {
        let tmpLeft = el.left,
            tmpRight = el.right;
        if (tmpLeft && tmpRight) {
            tmpLeft.right = tmpRight;
            tmpRight.left = tmpLeft;
        } else if (tmpLeft) {
            tmpLeft.right = tmpRight;
        } else if (tmpRight) {
            this.firstEl = tmpRight;
            tmpRight.left = null;
        } else {
            this.firstEl = null;
        }
    }

    getList(a, b) {
        let tmpArr = [],
            elTemp = this.firstEl,
            i=0;
        while (elTemp) {
            if (a<=i && (i<=b || b == undefined)) {
                tmpArr.push(elTemp.val);
            }
            elTemp = elTemp.right;
            i++;
        }
        return tmpArr;
    }

    length() {
        let count = 0,
            elTemp = this.firstEl;
        while (elTemp) {
            elTemp = elTemp.right;
            count++;
        }
        return count;
    }

    sort() {
        let elTemp = this.firstEl,
            elTemp2 = elTemp;

        while (elTemp) {
            let changed = false;
            elTemp2 = elTemp;
            while (elTemp2.right) {
                if (elTemp2.val > elTemp2.right.val) {
                    this.changeElements(elTemp2, elTemp2.right);
                    changed = true;
                }
                elTemp2 = elTemp2.right;
            }
            if (!changed) {
                break;
            }
            elTemp = elTemp.right;
        }
    }

    changeElements(el1, el2) {
        let tmpVal = el1.val;
        el1.val = el2.val;
        el2.val = tmpVal;
    }

    invert() {
        let elTemp = this.firstEl;

        while (elTemp) {
            let tmpLeft = elTemp.left,
                tmpRight = elTemp.right;
            elTemp.left = tmpRight;
            elTemp.right = tmpLeft;
            this.firstEl = elTemp;
            elTemp = elTemp.left;
        }
    }

    makeArray() {
        return this.getList(0);
    }

    getString() {
        let tmpStr = '',
            elTemp = this.firstEl;
        while (elTemp) {
            tmpStr=tmpStr ? tmpStr.concat(' ', elTemp.val.toString()) : elTemp.val.toString();
            elTemp = elTemp.right;
        }
        return tmpStr;
    }
}

let lList = new linkedList('a');
lList.deleteElementByValue('a');
console.log("is empty: " + lList.isEmpty());
console.log("the length is: " + lList.length());

lList.setFirstElement('0');
lList.pushElement({a: 'a', b: 'b'});
lList.pushElement('b');
lList.pushElement('d');
lList.unshiftElement('z');
lList.insertAfter('b', 'c');
lList.insertAfter('b', 'c');
console.log(lList.makeArray());
console.log("is empty: " + lList.isEmpty());
console.log("the length is:" + lList.length());

try {
    lList.deleteElementByIndex(1);
} catch (err) {
    console.log(err);
}

lList.deleteElementByValue('c');

console.log(lList.makeArray());

try {
    console.log("3rd element " + lList.getElement(3));
} catch (err) {
    console.log(err);
}

lList.makeFirstElement(3);
console.log(lList.makeArray());

lList.makeLastElement(1);
console.log(lList.makeArray());

lList.MoveElementAfter(2, 4);
console.log(lList.makeArray());

lList.sort();
console.log(lList.makeArray());

lList.invert();
console.log(lList.makeArray());
console.log(lList.getString());

let lList2 = new linkedList([1, 135, 67, 3, 65, 14]);
lList2.sort();
lList2.invert();
console.log(lList2.getString());
