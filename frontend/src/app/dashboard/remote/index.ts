import { client } from "@/remote";
import { useSuspenseQuery } from "@tanstack/react-query";

export type Project = { projectId: number; tags: string[]; name: string };
async function getProjectList() {
  return new Promise<Project[]>((res) =>
    res([
      { projectId: 1, tags: ["python"], name: "결제 서버" },
      { projectId: 2, tags: ["python"], name: "정산 서버" },
      { projectId: 3, tags: ["python"], name: "결제 프론트엔드" },
    ])
  );
}

export function useGetProjectListQuery() {
  return useSuspenseQuery({
    queryKey: ["getProjectList"],
    queryFn: () => getProjectList(),
  });
}

type ServerResponse<T> = {
  data: T;
  statusCode: number;
};

export type ReportedError = {
  _id: string;
  project: string;
  tags: string[];
  message: string;
  statusCode: number;
  stack: string;
  solution: string;
  isResolved: boolean;
  recycle: boolean;
};
async function getReportedErrorList() {
  return client.get<ServerResponse<ReportedError[]>>("/error-list");
  // return {
  //   data: {
  //     statusCode: 200,
  //     data: [
  //       {
  //         _id: "66655d3b92255edbba17d6fd",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           'Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\nTraceback (most recent call last):\n  File "/root/2024-oss-team14/backend/src/routes/test.py", line 9, in <module>\n    df = pd.DataFrame(data, index=data[\'year\']) # index추가할 수 있음\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/frame.py", line 778, in __init__\n    mgr = dict_to_mgr(data, index, columns, dtype=dtype, copy=copy, typ=manager)\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/internals/construction.py", line 503, in dict_to_mgr\n    return arrays_to_mgr(arrays, columns, index, dtype=dtype, typ=typ, consolidate=copy)\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/internals/construction.py", line 119, in arrays_to_mgr\n    arrays, refs = _homogenize(arrays, index, dtype)\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/internals/construction.py", line 630, in _homogenize\n    com.require_length_match(val, index)\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/common.py", line 573, in require_length_match\n    raise ValueError(\nValueError: Length of values (3) does not match length of index (2)\n',
  //         statusCode: 500,
  //         stack:
  //           'Traceback (most recent call last):\n  File "/root/2024-oss-team14/backend/src/routes/test.py", line 9, in <module>\n    df = pd.DataFrame(data, index=data[\'year\']) # index추가할 수 있음\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/frame.py", line 778, in __init__\n    mgr = dict_to_mgr(data, index, columns, dtype=dtype, copy=copy, typ=manager)\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/internals/construction.py", line 503, in dict_to_mgr\n    return arrays_to_mgr(arrays, columns, index, dtype=dtype, typ=typ, consolidate=copy)\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/internals/construction.py", line 119, in arrays_to_mgr\n    arrays, refs = _homogenize(arrays, index, dtype)\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/internals/construction.py", line 630, in _homogenize\n    com.require_length_match(val, index)\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/common.py", line 573, in require_length_match\n    raise ValueError(\nValueError: Length of values (3) does not match length of index (2)\n',
  //         solution:
  //           '이러한 오류는 스크립트 파일을 실행할 권한이 없는 경우 발생합니다. 일반적으로 "Permission denied" 오류는 실행 권한이 제대로 부여되지 않은 경우 발생합니다. 이 문제를 해결하기 위해 다음과 같은 절차를 따를 수 있습니다:\n\n1. 해당 스크립트 파일에 실행',
  //         isResolved: false,
  //         recycle: true,
  //       },
  //       {
  //         _id: "66655c6492255edbba17d6fc",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           'Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\nTraceback (most recent call last):\n  File "/root/2024-oss-team14/backend/src/routes/test.py", line 3, in <module>\n    sr = pd.Series([17000, 18000, 1000],\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/series.py", line 575, in __init__\n    com.require_length_match(data, index)\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/common.py", line 573, in require_length_match\n    raise ValueError(\nValueError: Length of values (3) does not match length of index (4)\n',
  //         statusCode: 500,
  //         stack:
  //           'Traceback (most recent call last):\n  File "/root/2024-oss-team14/backend/src/routes/test.py", line 3, in <module>\n    sr = pd.Series([17000, 18000, 1000],\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/series.py", line 575, in __init__\n    com.require_length_match(data, index)\n  File "/usr/local/lib64/python3.9/site-packages/pandas/core/common.py", line 573, in require_length_match\n    raise ValueError(\nValueError: Length of values (3) does not match length of index (4)\n',
  //         solution:
  //           '이러한 오류는 스크립트 파일을 실행할 권한이 없는 경우 발생합니다. 일반적으로 "Permission denied" 오류는 실행 권한이 제대로 부여되지 않은 경우 발생합니다. 이 문제를 해결하기 위해 다음과 같은 절차를 따를 수 있습니다:\n\n1. 해당 스크립트 파일에 실행',
  //         isResolved: false,
  //         recycle: true,
  //       },
  //       {
  //         _id: "6665406292255edbba17d6fb",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           'Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\n  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World)\n                       ^\nSyntaxError: EOL while scanning string literal\n',
  //         statusCode: 500,
  //         stack:
  //           '  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World)\n                       ^\nSyntaxError: EOL while scanning string literal\n',
  //         solution:
  //           "이 에러 메시지는 시스템이 'python'이라는 명령어를 찾을 수 없다는 것을 나타냅니다. 보통 Python이 시스템 PATH에 추가되어 있지 않거나 Python이 설치되지 않았을 때 발생할 수 있습니다. 이 문제를 해결하기 위한 몇 가지 방법이 있습니다:\n\n",
  //         isResolved: false,
  //         recycle: true,
  //       },
  //       {
  //         _id: "666540028823759ecb886bc4",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           'Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\n  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World)\n                       ^\nSyntaxError: EOL while scanning string literal\n',
  //         statusCode: 500,
  //         stack:
  //           '  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World)\n                       ^\nSyntaxError: EOL while scanning string literal\n',
  //         solution:
  //           '**원인:** 이 오류는 문자열 리터럴을 정확하게 닫지 않아 발생합니다. 코드에서 문자열의 끝을 명시하기 위해 따옴표를 사용하지 않았기 때문에 발생한 오류이다.\n\n**키워드:** SyntaxError\n\n**해결책:** 문자열 리터럴을 올바르게 닫아야 한다. 따라서 코드에서 따옴표를 추가하여 이 오류를 해결할 수 있다. \n\n```python\nprint("Hello World")\n```\n\n**요약:** SyntaxError는 문자열 리터럴을 정확하게 닫지 않았을 때 발생하는 오류로, 해결책은 문자열을 올바르게 닫는 것이다.',
  //         isResolved: false,
  //         recycle: false,
  //       },
  //       {
  //         _id: "66653fac17a5c6871a11f74e",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           'Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\n  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World)\n                       ^\nSyntaxError: EOL while scanning string literal\n',
  //         statusCode: 500,
  //         stack:
  //           '  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World)\n                       ^\nSyntaxError: EOL while scanning string literal\n',
  //         solution:
  //           'Cause: The error "SyntaxError: EOL while scanning string literal" in Python typically occurs when a string literal is not properly closed with a matching quotation mark.\n\nKeyword of cause: SyntaxError\n\nExample code:\n\n```python\nprint("Hello World)\n```\n\nCause, keyword, and solution:\n- Cause: This error occurs when a string literal is not properly terminated.\n- Keyword: SyntaxError\n- Solution: To fix this error, ensure that string literals are closed with matching quotation marks. In the provided example, the missing closing quotation mark should be added: print("Hello World")',
  //         isResolved: false,
  //         recycle: false,
  //       },
  //       {
  //         _id: "66653f6f17a5c6871a11f74d",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           'Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\n  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World)\n                       ^\nSyntaxError: EOL while scanning string literal\n',
  //         statusCode: 500,
  //         stack:
  //           '  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World)\n                       ^\nSyntaxError: EOL while scanning string literal\n',
  //         solution:
  //           '**원인:**\n이 에러는 문자열 리터럴을 정확히 닫지 않은 것으로 인해 발생합니다.\n\n**키워드:**\nSyntaxError\n\n**해결책:**\n문자열 리터럴을 제대로 닫아주어야 합니다. 즉, `"Hello World"`에서 큰따옴표(`"`)도 마지막에 닫아줘야 합니다. \n\n**예시 코드:**\n```python\nprint("Hello World")\n```\n\n**요약:**\n문자열 리터럴을 정확히 열고 닫지 않아서 발생한 SyntaxError입니다. 문자열 뒤에 등장하는 다음 문자가 없는 경우, 즉 마지막에 누락된 따옴표(`"`)로 인한 오류입니다. 이 오류를 해결하기 위해서는 문자열 리터럴을 제대로 닫아주어야 합니다.',
  //         isResolved: false,
  //         recycle: false,
  //       },
  //       {
  //         _id: "666524b6891a80d6e83754ee",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           'Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\n  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World"")\n                         ^\nSyntaxError: EOL while scanning string literal\n',
  //         statusCode: 500,
  //         stack:
  //           '  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World"")\n                         ^\nSyntaxError: EOL while scanning string literal\n',
  //         solution:
  //           "이 에러는 문자열 리터럴을 파싱하는 동안 줄 끝에 도달했다는 의미입니다. 주로 따옴표나 큰따옴표의 닫는 것 (') 또는 (\") 를 말합니다. \n\n이 오류를 수정하려면 코드에서 따옴표를 올바르",
  //         isResolved: true,
  //       },
  //       {
  //         _id: "66652418891a80d6e83754ed",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           'Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\n  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World"")\n                         ^\nSyntaxError: EOL while scanning string literal\n',
  //         statusCode: 500,
  //         stack:
  //           '  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World"")\n                         ^\nSyntaxError: EOL while scanning string literal\n',
  //         solution:
  //           '해당 에러 메시지는 파이썬 문법 오류로, 문자열을 닫는 따옴표가 누락되었기 때문에 발생합니다. `print("Hello World"")`의 경우 두 번째 따옴표가 하나가 더 사용되었기 때문에 발생하는 오류입니다.\n\n해결책은 따',
  //         isResolved: true,
  //       },
  //       {
  //         _id: "6665240e891a80d6e83754ec",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           'Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\n  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World"")\n                         ^\nSyntaxError: EOL while scanning string literal\n',
  //         statusCode: 500,
  //         stack:
  //           '  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World"")\n                         ^\nSyntaxError: EOL while scanning string literal\n',
  //         solution:
  //           'Sure, in addition to correcting the string literal by removing the extra double quotation mark, another potential solution is to use a raw string literal. This would be helpful if you want to include double quotation marks within the printed string without escaping them. \n\nHere is how you can do it by using a raw string literal with triple double quotes:\n```python\nprint("""Hello "World"""")\n```\n\nIn this way, the raw string literal can handle the presence of double quotation marks within the printed string without causing a syntax error. Remember to make this correction in your code and ensure that it reflects the changes suggested above.',
  //         isResolved: true,
  //       },
  //       {
  //         _id: "666523ba891a80d6e83754eb",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           'Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\n  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World"")\n                         ^\nSyntaxError: EOL while scanning string literal\n',
  //         statusCode: 500,
  //         stack:
  //           '  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World"")\n                         ^\nSyntaxError: EOL while scanning string literal\n',
  //         solution:
  //           '위에서 제시해준 해결책을 적용하여 코드를 수정했다면 아래와 같이 코드를 변경해서 사용해볼 수 있습니다.\n\n```python\nprint("Hello World")\n```\n\n위 코드에서는 문자열의 시작과 끝에 모두 큰따옴표(`"`)를 사용하는 것을 확인할 수 있습니다. 만약에 작은 따옴표를 사용하고 싶다면 아래와 같이 코드를 수정할 수 있습니다.\n\n```python\nprint(\'Hello World\')\n```\n\n또는, 쌍따옴표(`""`)를 사용하고 싶다면 아래와 같이 코드를 수정할 수 있습니다.\n\n```python\nprint("Hello World")\n```\n\n이렇게 하면 문자열의 따옴표 형식이 맞게 사용되어 `SyntaxError: EOL while scanning string literal` 오류를 해결할 수 있을 것입니다.',
  //         isResolved: false,
  //       },
  //       {
  //         _id: "66651fbd891a80d6e83754ea",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           'Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\n  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World)\n                       ^\nSyntaxError: EOL while scanning string literal\n',
  //         statusCode: 500,
  //         stack:
  //           '  File "/root/2024-oss-team14/backend/src/routes/test.py", line 1\n    print("Hello World)\n                       ^\nSyntaxError: EOL while scanning string literal\n',
  //         solution:
  //           "해당 오류는 Python 스크립트에서 문자열이 올바르게 닫히지 않은 경우 발생합니다. 에러 메시지의 '^' 표시는 파이썬이 문자열 리터럴의 끝을 찾지 못했다는 것을 가리킵니다.\n\n문자열 리터럴을 올바르게",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "66651f5e891a80d6e83754e9",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\n/bin/sh: line 1: /root/2024-oss-team14/backend/src/routes/test.sh: Permission denied\n",
  //         statusCode: 500,
  //         stack:
  //           "/bin/sh: line 1: /root/2024-oss-team14/backend/src/routes/test.sh: Permission denied\n",
  //         solution:
  //           "'Permission denied' 에러는 해당 파일을 실행할 수 있는 권한이 없기 때문에 발생합니다. 이 문제를 해결하기 위한 대안이 다음과 같습니다:\n\n1. **파일 실행 권한 부여**: 스크립트 파일에 실행 권한을 추가합니다.\n    ```bash\n    chmod +x /root/2024-oss-team14/backend/src/routes/test.sh\n    ```\n\n위 명령은 해당 스크립트 파일에 실행 권한을 부여할 것입니다.\n\n만약 이 방법이 작동하지 않는다면, 다른 해결책으로는 다음과 같은 점을 확인해 볼 수 있습니다:\n\n2. **파일 경로 오류 확인**: 스크립트 파일의 경로가 정확한지 확인하세요. 파일 경로가 잘못되었거나 파일이 존재하지 않을 경우에도 Permission denied 에러가 발생할 수 있습니다.\n\n이러한 방법들을 확인해 보세요.",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "66651eb66e73815ff1111954",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\npython3: can't open file '/root/2024-oss-team14/backend/./test.py': [Errno 2] No such file or directory\n",
  //         statusCode: 500,
  //         stack:
  //           "python3: can't open file '/root/2024-oss-team14/backend/./test.py': [Errno 2] No such file or directory\n",
  //         solution:
  //           "이러한 오류는 파일이나 디렉토리가 존재하지 않아서 발생할 수 있습니다. 오류 메시지에서 확인할 수 있듯이 지정된 파일 또는 디렉토리를 찾을 수 없기 때문에 발생한 것으로 보입니다.\n\n가장 가능성 있는 이유는 지정된 파일인 `test.py`가 실",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "66651e8c6e73815ff1111953",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: /root/2024-oss-team14/backend/src/routes/test.sh\n/bin/sh: line 1: /root/2024-oss-team14/backend/src/routes/test.sh: Permission denied\n",
  //         statusCode: 500,
  //         stack:
  //           "/bin/sh: line 1: /root/2024-oss-team14/backend/src/routes/test.sh: Permission denied\n",
  //         solution:
  //           '이러한 오류는 스크립트 파일을 실행할 권한이 없는 경우 발생합니다. 일반적으로 "Permission denied" 오류는 실행 권한이 제대로 부여되지 않은 경우 발생합니다. 이 문제를 해결하기 위해 다음과 같은 절차를 따를 수 있습니다:\n\n1. 해당 스크립트 파일에 실행',
  //         isResolved: false,
  //       },
  //       {
  //         _id: "66651d7b1a0b4eb94b528442",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: python /root/2024-oss-team14/backend/src/routes/test.py\n/bin/sh: line 1: python: command not found\n",
  //         statusCode: 500,
  //         stack: "/bin/sh: line 1: python: command not found\n",
  //         solution:
  //           "이 에러 메시지는 시스템이 python 명령어를 찾을 수 없다는 것을 의미합니다. Python이 시스템 환경 변수에 제대로 설정되어 있지 않거나 Python이 설치되어 있지 않은 경우에 발생할 수 있습니다. \n\n해결책으로는 다음과 같은 방법을 시도해 볼 수 있",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "66651d3c1a0b4eb94b528441",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: python /root/2024-oss-team14/backend/src/routes/test.py\n/bin/sh: line 1: python: command not found\n",
  //         statusCode: 500,
  //         stack: "/bin/sh: line 1: python: command not found\n",
  //         solution:
  //           "해당 오류는 시스템이 `python` 명령어를 찾을 수 없기 때문에 발생합니다. \n\n**원인:**\n이것은 Python이 시스템 환경변수에 설정되어 있지 않기 때문에 발생하는 오류이며, 시스템이 Python 인터프리터를 찾을 수 없음을 나타",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "66651d391a0b4eb94b528440",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: python /root/2024-oss-team14/backend/src/routes/test.py\n/bin/sh: line 1: python: command not found\n",
  //         statusCode: 500,
  //         stack: "/bin/sh: line 1: python: command not found\n",
  //         solution:
  //           "**에러 메세지:**  \n`/bin/sh: line 1: python: command not found`\n\n**에러 원인:**  \n이 에러는 시스템에서 `python` 명령어를 찾을 수 없다는 의미입니다. 이는 Python이 설치되어 있지 않거나 시스템의 PATH 환경변수에 Python 바이너리 파일의 경로가",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "66651d2b1a0b4eb94b52843f",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: python /root/2024-oss-team14/backend/src/routes/test.py\n/bin/sh: line 1: python: command not found\n",
  //         statusCode: 500,
  //         stack: "/bin/sh: line 1: python: command not found\n",
  //         solution:
  //           "이 오류는 시스템에서 Python이 인식되지 않아서 발생하는 문제입니다. 이런 에러가 발생할 때 대부분은 Python이 올바로 설치되지 않았거나 환경 변수에 추가되지 않았을 때 나타납니다. \n\n다음은 해결책입니다:\n\n1. 먼저 시스템에 Python",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "66651caa8dac7b98620b1a43",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: python /root/2024-oss-team14/backend/src/routes/test.py\n/bin/sh: line 1: python: command not found\n",
  //         statusCode: 500,
  //         stack: "/bin/sh: line 1: python: command not found\n",
  //         solution:
  //           "이러한 오류 메시지는 시스템에 Python이 설치되어 있지 않거나 시스템이 Python에 대한 환경 변수를 인식하지 못할 때 발생할 수 있습니다. 이 문제를 해결하기 위해서는 다음과 같은 단계를 따를 수 있습니다:\n\n1. Python이 설치되어 있는지 확인: \n   - 터",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "66651b4ea40d1cdf28808b2d",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: python /root/2024-oss-team14/backend/src/routes/test.py\n/bin/sh: line 1: python: command not found\n",
  //         statusCode: 500,
  //         stack: "/bin/sh: line 1: python: command not found\n",
  //         solution:
  //           "이 에러는 필요한 Python 인터프리터가 시스템에서 찾을 수 없을 때 발생합니다. 다음은 이 문제를 해결하는 몇 가지 방법입니다:\n\n1. **Python 설치 확인하기:**\n   먼저 시스템에 Python이 설치되어 있는지 확인해야 합니다. 터미널에서 `python --version`",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "66651b26a40d1cdf28808b2c",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: python /root/2024-oss-team14/backend/src/routes/test.py\n/bin/sh: line 1: python: command not found\n",
  //         statusCode: 500,
  //         stack: "/bin/sh: line 1: python: command not found\n",
  //         solution:
  //           "이러한 오류 메시지가 발생하는 이유는 시스템에 Python이 설치되어 있지 않거나 사용 중인 환경에 Python의 경로가 정확하게 추가되지 않은 경우입니다. 다음의 해결책 중 하나를 시도해 보세요:\n\n1. Python이 설치되어 있는지 확인해 주세요:\n   \n   터미널에서",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "66651a51a40d1cdf28808b2b",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: python /root/2024-oss-team14/backend/src/routes/test.py\n/bin/sh: line 1: python: command not found\n",
  //         statusCode: 500,
  //         stack: "/bin/sh: line 1: python: command not found\n",
  //         solution:
  //           "해당 오류는 Python이 시스템의 PATH 환경 변수에 등록되어 있지 않아서 발생하는 문제입니다. 이를 해결하기 위해서는 Python이 시스템에 설치되어 있어야 하며, 환경 변수에 등록해야 합니다. \n\n1. 먼저, Python이 시스템에 설치되어 있는지 확인합니다.",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "66651a37a40d1cdf28808b2a",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: python /root/2024-oss-team14/backend/src/routes/test.py\n/bin/sh: line 1: python: command not found\n",
  //         statusCode: 500,
  //         stack: "/bin/sh: line 1: python: command not found\n",
  //         solution:
  //           "이러한 오류 메시지는 `python` 명령을 찾을 수 없다는 의미입니다. 주로 Python이 올바르게 설치되지 않았거나 환경 변수가 제대로 설정되지 않았을 때 발생할 수 있습니다.\n\n해결책은 다음과 같습니다:\n1. 우선 Python이 시스템에 설치",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "666519d35cb9be15f172b4d7",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: python /root/2024-oss-team14/backend/src/routes/test.py\n/bin/sh: line 1: python: command not found\n",
  //         statusCode: 500,
  //         stack: "/bin/sh: line 1: python: command not found\n",
  //         solution:
  //           "이러한 오류 메시지는 시스템이 파이썬을 찾지 못해서 발생하는 것입니다. 해당 오류를 해결하는 방법은 다양합니다. 다음과 같은 접근 방식을 시도해볼 수 있습니다.\n\n1. 파이썬이 설치되어 있는지 확인하십시오:\n프로그램 설치 위치에",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "6665193d5cb9be15f172b4d6",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: python /root/2024-oss-team14/backend/src/routes/test.py\n/bin/sh: line 1: python: command not found\n",
  //         statusCode: 500,
  //         stack: "/bin/sh: line 1: python: command not found\n",
  //         solution:
  //           "이 에러는 시스템에서 Python 실행 파일을 찾을 수 없는 경우 발생하는 것으로 보입니다. \n\n원인:\n- 시스템에 Python이 설치되어 있지 않은 경우\n- 시스템 경로(PATH)에 Python 실행 파일이 포함되어 있지 않은 경우\n\n해결책:\n1. Python이 설치되어 있는지 확인하세요. Python이 설치",
  //         isResolved: false,
  //       },
  //       {
  //         _id: "6665189f5cb9be15f172b4d5",
  //         project: "[OSS payment 팀] 결제",
  //         tags: "python",
  //         message:
  //           "Command failed: python /root/2024-oss-team14/backend/src/routes/test.py\n/bin/sh: line 1: python: command not found\n",
  //         statusCode: 500,
  //         stack: "/bin/sh: line 1: python: command not found\n",
  //         solution:
  //           "이 에러 메시지는 시스템이 'python'이라는 명령어를 찾을 수 없다는 것을 나타냅니다. 보통 Python이 시스템 PATH에 추가되어 있지 않거나 Python이 설치되지 않았을 때 발생할 수 있습니다. 이 문제를 해결하기 위한 몇 가지 방법이 있습니다:\n\n",
  //         isResolved: false,
  //       },
  //     ],
  //   },
  // };
}
export function useGetReportedErrorListQuery() {
  return useSuspenseQuery({
    queryKey: ["getReportedErrorList"],
    queryFn: () => getReportedErrorList(),
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function resolveError({ errorId }: { errorId: string }) {
  return client.post(`/errors/resolve`, { id: errorId });
}

export function reSolutionError({
  errorId,
  promptMessage,
}: {
  errorId: string;
  promptMessage: string;
}) {
  return client.post(`/errors/re-solution`, {
    id: errorId,
    feedback: promptMessage,
  });
}

export type ConsoleResult = { statusCode: number; data: string };

export function sendPyCode({ code }: { code: string }) {
  return client.post<ConsoleResult>(`/errors/py`, {
    code,
  });
}
