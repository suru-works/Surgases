for %%f in ("%1\*.txt") do (
    start /min notepad /P "%%f"
    del "%%f"
)