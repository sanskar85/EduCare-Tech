"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTest = exports.UpdateTest = exports.DeleteQuestion = exports.SaveQuestion = exports.TestResponses = exports.TestDetails = exports.CreateTest = exports.AllTests = void 0;
const Test_1 = __importDefault(require("../../model/Test"));
// import moment from 'moment';
const Result_1 = __importDefault(require("../../model/Result"));
const Question_1 = __importDefault(require("../../model/Question"));
const AllTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tests = yield Test_1.default.find().sort({ createdAt: 1 });
    return result(res, 200, tests.map((test) => ({
        id: test._id,
        title: test.title,
    })));
});
exports.AllTests = AllTests;
const CreateTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, time } = req.body;
    const test = new Test_1.default({
        title,
        time: time * 60 * 1000,
    });
    try {
        yield test.save();
        return result(res, 200, {
            message: 'Test created successfully',
            testID: test._id,
        });
    }
    catch (err) {
        return result(res, 500, 'Unable to create test');
    }
});
exports.CreateTest = CreateTest;
const TestDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.testID;
    if (!id)
        return result(res, 400, 'Invalid test ID');
    const test = yield Test_1.default.findById(id).populate('questions');
    if (!test)
        return result(res, 404, 'Test not found');
    return result(res, 200, {
        title: test.title,
        time: test.time / (60 * 1000),
        questions: test.questions.map((question) => ({
            id: question._id,
            question: question.question,
            option1: question.option1,
            option2: question.option2,
            option3: question.option3,
            option4: question.option4,
            answer: question.answer,
        })),
    });
});
exports.TestDetails = TestDetails;
const TestResponses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.testID;
    if (!id)
        return result(res, 400, 'Invalid test ID');
    const test = yield Test_1.default.findById(id).populate('questions');
    if (!test)
        return result(res, 404, 'Test not found');
    const results = yield Result_1.default.find({ test }).populate('user');
    const _results = results.map((result) => ({
        name: result.user.name,
        email: result.user.email,
        marks: result.score,
    }));
    return result(res, 200, _results);
});
exports.TestResponses = TestResponses;
const SaveQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, question, option1, option2, option3, option4, answer } = req.body;
    let _question = null;
    let updated = false;
    if (!id) {
        _question = new Question_1.default();
    }
    else {
        _question = yield Question_1.default.findById(id);
        if (!_question)
            return result(res, 404, 'Question not found');
        updated = true;
    }
    _question.question = question;
    _question.option1 = option1;
    _question.option2 = option2;
    _question.option3 = option3;
    _question.option4 = option4;
    _question.answer = answer;
    _question.save();
    return result(res, 200, {
        message: 'Question saved successfully',
        id: _question._id,
        question: _question.question,
        option1: _question.option1,
        option2: _question.option2,
        option3: _question.option3,
        option4: _question.option4,
        answer: _question.answer,
        updated,
    });
});
exports.SaveQuestion = SaveQuestion;
const DeleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const question = yield Question_1.default.findById(id);
    if (!question)
        return result(res, 404, 'Question not found');
    question.remove();
    return result(res, 200, 'Question deleted successfully');
});
exports.DeleteQuestion = DeleteQuestion;
const UpdateTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { testID } = req.params;
    const { title, questions, time } = req.body;
    const test = yield Test_1.default.findById(testID);
    if (!test)
        return result(res, 404, 'Test not found');
    const _questions = yield Question_1.default.find({ _id: { $in: questions.map((q) => q.id) } });
    test.title = title;
    test.questions = _questions;
    test.time = time * 60 * 1000;
    test.save();
    return result(res, 200, 'Test updated successfully');
});
exports.UpdateTest = UpdateTest;
const DeleteTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { testID } = req.params;
    const test = yield Test_1.default.findById(testID);
    if (!test)
        return result(res, 404, 'Test not found');
    test.remove();
    return result(res, 200, 'Test deleted successfully');
});
exports.DeleteTest = DeleteTest;
const result = (res, status, data) => {
    res.status(status).json(data);
};
//# sourceMappingURL=Test.js.map