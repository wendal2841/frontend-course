'use strict';

const assert = require('chai').assert;

let calculator = require('../calculator_script');

describe('Calculator test', function(){
    describe('rpn stack generation test', function(){
        it('2 + 3 * 15' + " return ['2', '3', '15', '*', '+']", function(){
            let result = calculator.createRPN('2 + 3 * 15');
            assert.deepEqual(result, ['2', '3', '15', '*', '+'])
        });
        it('( 2 + 3 ) * 15' + " return ['2', '3', '15', '*', '+']", function(){
            let result = calculator.createRPN('( 2 + 3 ) * 15');
            assert.deepEqual(result, ['2', '3', '+', '15', '*'])
        });
        it('2 + cos ( 3 * 15 )' + " return ['2', '3', '15', '*', 'cos', '+']", function(){
            let result = calculator.createRPN('2 + cos ( 3 * 15 )');
            assert.deepEqual(result, ['2', '3', '15', '*', 'cos', '+'])
        });
        it('2 + cos ( 3 * 15' + " return ['2', '3', '15', '*', 'cos', '+']", function(){
            let result = calculator.createRPN('2 + cos ( 3 * 15');
            assert.deepEqual(result, ['2', '3', '15', '*', 'cos', '+'])
        });
        it('2 + cos ( 3 * 15' + " return ['2', '3', '15', '*', 'cos', '+']", function(){
            let result = calculator.createRPN('2 + cos ( 3 * 15');
            assert.deepEqual(result, ['2', '3', '15', '*', 'cos', '+'])
        });
        it('cos ( ' + " return []", function(){
            let result = calculator.createRPN('cos ( ');
            assert.deepEqual(result, [])
        });
        it(' + ' + " return []", function(){
            let result = calculator.createRPN('2 + cos ( 3 * 15');
            assert.deepEqual(result, [])
        });
        it(' 2 ' + " return ['2']", function(){
            let result = calculator.createRPN('2');
            assert.deepEqual(result, ['2'])
        });
        it('( 1 + 3 ) !' + " return ['1', '3', '+', '!']", function(){
            let result = calculator.createRPN('( 1 + 3 ) !');
            assert.deepEqual(result, ['1', '3', '+', '!'])
        });
        it('( 1 + 3 !' + " return ['1', '3', '!', '+']", function(){
            let result = calculator.createRPN('( 1 + 3 !');
            assert.deepEqual(result, ['1', '3', '!', '+'])
        });
        it('cos ( tan 1' + " return []", function(){
            let result = calculator.createRPN('( 1 + 3 !');
            assert.deepEqual(result, [])
        });
        it('cos ( tan ( 1' + " return ['1', 'tan', 'cos']", function(){
            let result = calculator.createRPN('cos ( tan ( 1');
            assert.deepEqual(result, ['1', 'tan', 'cos'])
        });
        it('2 ^' + " return []", function(){
            let result = calculator.createRPN('2 ^');
            assert.deepEqual(result, [])
        });
        it('ln ( - 1 )' + " return ['1', '-', 'ln']", function(){
            let result = calculator.createRPN('ln ( - 1 )');
            assert.deepEqual(result, ['1', '-', 'ln'])
        });
        it('- 1' + " return ['1', '-']", function(){
            let result = calculator.createRPN('- 1');
            assert.deepEqual(result, ['1', '-'])
        });
    });
    describe('calculation rpn stack', function(){
        it('[]' + " return 'ERROR'", function(){
            let result = calculator.calculate([]);
            assert.deepEqual(result, 'ERROR')
        });
        it("['2', '2', '+', '+']" + " return 'ERROR'", function(){
            let result = calculator.calculate([]);
            assert.deepEqual(result, 'ERROR')
        });
        it("['2', '2', '+']" + " return 4", function(){
            let result = calculator.calculate(['2', '2', '+']);
            assert.deepEqual(result, 4)
        });
    });
    describe('calculation rpn stack', function(){
        it("['2', '3', '15', '*', '(', 'cos', '+']" + " return ['2', '3', '15', '*', 'cos', '+']", function(){
            let result = calculator.stackBracketHandler(['2', '3', '15', '*', '(', 'cos', '+']);
            assert.deepEqual(result, ['2', '3', '15', '*', 'cos', '+'])
        });
    });
})