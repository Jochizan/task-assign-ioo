from task_assignment import TaskAssignment
from flask import Flask, jsonify, json, request, render_template
import numpy as np

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')


@app.route('/api/task_assignment', methods=['POST'])
def api_task_assignment():
    task_matrix = list(json.loads(request.data))
    task_matrix = [list(map(int, i)) for i in task_matrix]
    task_matrix = np.array(task_matrix)
    ass_by_hungary = TaskAssignment(task_matrix, 'Hungary')
    min_cost = int(ass_by_hungary.min_cost)
    best_solution = ass_by_hungary.best_solution
    print(min_cost)
    print(best_solution)
    return jsonify({"min_cost": min_cost, "best_solution": best_solution})


if __name__ == '__main__':
    app.run(debug=True)
