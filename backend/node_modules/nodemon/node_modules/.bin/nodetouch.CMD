@SETLOCAL
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\..\..\..\..\touch@3.1.0\node_modules\touch\bin\nodetouch.js" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\..\..\..\..\touch@3.1.0\node_modules\touch\bin\nodetouch.js" %*
)
